const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'homecookedsjsu@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

const issueJWT = user => {
    const payload = {
        id: user._id,
        email: user.email,
        iat: Date.now()
    };

    const expiresIn = '1d';

    const signedToken = jsonwebtoken.sign(
        payload, 
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
        );

    return signedToken;
};

//Create a user
router.post(
    '/register',
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 5}), 
    (req, res) => {
    
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (user)
            return res.status(409).json({ success: false, msg: "Email exists"});
        else
        {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ success: false, errors: errors.array() });
            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err)
                    res.status(500).json({ success: false, error: err });
                else
                {
                    const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });

                    const mailOptions = {
                        from: 'homecookedsjsu@gmail.com',
                        to: newUser.email,
                        subject: 'HomeCooked account created',
                        text: 'Your HomeCooked account has successfully been created'
                    };
        
                    newUser.save()
                    .then(user => {
                        const jwt = issueJWT(user);
        
                        res.cookie("access_token", jwt, { httpOnly: true });
                        res.json({ success: true });

                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err)
                                console.log(err);
                            else
                                console.log('Email sent: ' + info.response);
                        });
                    })
                    .catch(err => res.json({ success: false, error: err }));
                }
            });
        }
    })
    .catch(err => res.json({ success: false, error: err}));

});

//Login a user
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user)
            return res.status(401).json({ success: false, msg: "Invalid email/password"});

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err)
                return res.status(401).json({ success: false, msg: "Invalid email/password"});
            
            if (result)
            {
                const jwt = issueJWT(user);

                res.cookie("access_token", jwt, { httpOnly: true });
                res.status(200).json({ success: true });
            }
            else
            {
                return res.status(401).json({ success: false, msg: "Invalid email/password"});
            }
        });
    })
    .catch(err => res.json({ error: err }));
});

//Test authenticated route
router.get('/checkAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("checkAuth backend")
    res.status(200).json({ success: true, msg: "You are authorized"});
});

router.get('/signOut', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ success: true });
})

router.get('/test', (req, res) => {
    res.json({message: "test"});
    console.log("test backend")
})


module.exports = router;
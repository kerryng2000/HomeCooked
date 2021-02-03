const mongoose = require('mongoose');
const User = mongoose.model('User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    };
};

//Create a user
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            res.status(500).json({ error: err });
        else
        {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });

            newUser.save()
            .then(user => {
                const jwt = issueJWT(user);

                res.json({ 
                    success: true,
                    user: user,
                    token: jwt.token,
                    expirsIn: jwt.expires
                })
            })
            .catch(err => res.json({ error: err }));
        }
    });
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

                res.status(200).json( { 
                    success: true,
                    user: user,
                    token: jwt.token,
                    expires: jwt.expires
                });
            }
            else
            {
                return res.status(401).json({ success: false, msg: "Invalid email/password"});
            }
        });
    })
    .catch(err => res.json({ error: err }));
});


module.exports = router;
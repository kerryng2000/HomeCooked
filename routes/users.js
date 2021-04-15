const mongoose = require("mongoose");
const User = mongoose.model("User");
const Dish = mongoose.model("Dish")
const router = require("express").Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "homecookedsjsu@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const issueJWT = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    iat: Date.now(),
  };

  const expiresIn = "1d";

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return signedToken;
};

router.get("/favoriteChefs", passport.authenticate("jwt", { session: false }), (req, res) => {
  User.findById(req.user._id)
  .select("favoriteChefs")
  .populate("favoriteChefs.chef", "_id firstName lastName profilePicture")
  .then(favChefs => res.json(favChefs))
  .catch(err => res.json({error: err}))
})

//Create a user
router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  (req, res) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user)
          return res.status(409).json({ success: false, msg: "Email exists" });
        else {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res
              .status(400)
              .json({ success: false, errors: errors.array() });

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) res.status(500).json({ success: false, error: err });
            else {
              const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                favoriteChefs: []
              });

              const mailOptions = {
                from: "homecookedsjsu@gmail.com",
                to: newUser.email,
                subject: "HomeCooked account created",
                text: "Your HomeCooked account has successfully been created",
              };

              newUser
                .save()
                .then((user) => {
                  const jwt = issueJWT(user);

                  res.cookie("access_token", jwt, { httpOnly: true });
                  res.json({
                    success: true,
                    user: {
                      _id: user._id,
                      email: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      profilePicture: user.profilePicture,
                      favoriteChefs: user.favoriteChefs
                    },
                  });

                  transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err);
                    else console.log("Email sent: " + info.response);
                  });
                })
                .catch((err) => res.json({ success: false, error: err }));
            }
          });
        }
      })
      .catch((err) => res.json({ success: false, error: err }));
  }
);

//Login a user
router.post("/signIn", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ success: false, msg: "Invalid email/password" });

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
          return res
            .status(401)
            .json({ success: false, msg: "Invalid email/password" });

        if (result) {
          const jwt = issueJWT(user);

          res.cookie("access_token", jwt, { httpOnly: true });
          res.status(200).json({
            success: true,
            user: {
              _id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              profilePicture: user.profilePicture,
              favoriteChefs: user.favoriteChefs
            },
          });
        } else {
          return res
            .status(401)
            .json({ success: false, msg: "Invalid email/password" });
        }
      });
    })
    .catch((err) => res.json({ error: err }));
});

//Test authenticated route
router.get(
  "/checkAuth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({ success: true, msg: "You are authorized", user: {
      profilePicture: req.user.profilePicture,
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      favoriteChefs: req.user.favoriteChefs
    } });
  }
);

router.get(
  "/signOut",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ success: true });
  }
);

//Get user profile info
router.get(
  "/userProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = {
      profilePicture: req.user.profilePicture,
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };

    return res.json(user);
  }
);

//Get user by id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
  .select("-password")
  .then(user => {
    res.json(user);
  })
  .catch(err => res.json({error: err}))
})

//Get dishes from specific user
router.get("/dishes/:id", (req, res) => {
  Dish.find({ chef: req.params.id })
  .exec()
  .then(dishes => {
    res.json(dishes)
  })
  .catch(err => res.json({error: err}))
})

//Update user
router.put(
  "/updateUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, req.body)
      .exec()
      .then((user) => res.json(user))
      .catch((err) => res.json({ error: err }));
  }
);

//Update profile picture
router.put(
  "/updateProfPic",
  upload.single("profilePicture"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.file);
    
    User.findOneAndUpdate(
      { _id: req.user._id },
      { profilePicture: req.file.path },
      { new: true }
    )
      .exec()
      .then((user) => res.json(user.profilePicture))
      .catch((err) => res.json({ error: err }));
  }
);

router.post("/addFavorite/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  User.findOneAndUpdate(
    {_id: req.user._id, 'favoriteChefs.chef': { $ne: req.params.id} },
    {$push: {
      favoriteChefs: {'chef': req.params.id}
    }},
    { new: true }
  )
  .then(user => res.json({success: true, favoriteChefs: user.favoriteChefs}))
  .catch(err => res.json({success: false, error: err}))
})

router.post("/removeFavorite/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  User.updateOne(
    {_id: req.user._id},
    {$pull: {
      favoriteChefs: {'chef': req.params.id}
    }},
    { new: true }
  )
  .then(user => {
    if (user.favoriteChefs)
       res.json({success: true, favoriteChefs: user.favoriteChefs})
    else
        res.json({success: true, favoriteChefs: []})
  })
  .catch(err => res.json({success: false, error: err}))
})

module.exports = router;

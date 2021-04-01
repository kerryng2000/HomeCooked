const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const passport = require("passport");
const Review = require('../models/Review');
const User = require('../models/User');

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const review = new Review ({
        _id: new mongoose.Types.ObjectId(),
        user: req.user._id,
        chef: req.body.chef,
        rating: req.body.rating,
        description: req.body.description
    })

    review.save()
    .then(savedReview => {
        res.json({success: true})
    })
    .catch(err => res.json({success: false, error: err}))
})
router.get("/:id", (req, res) => {
    Review.find({ chef: req.params.id }).populate("user", "-password")
    .then(reviews => {
        res.json(reviews)
    })
    .catch(err => res.json({error: err}))
    
})

module.exports = router;
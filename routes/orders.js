const mongoose = require("mongoose");
const express = require("express");
const router = new express.Router();
const passport = require("passport");
const Order = require('../models/Order');
const Stripe = require("stripe");
const Cart = require("../models/Cart");
const stripe = new Stripe(process.env.STRIPE_SECRET);

const getDate = () => {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return month + '/' + day + '/' + year;
  }

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Order.find({ user: req.user._id }).populate("items.dish")
    .exec()
    .then(orders => {
        res.json(orders)
    })
    .catch(err => res.json({ error: err }))
})

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const total = req.body.items.reduce((acc, item) => acc + item.quantity * item.dish.price, 0);
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount: Math.round(total * 100),
            currency: "USD",
            payment_method: req.body.id,
            confirm: true
        });

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            payment_id: payment.id,
            total: req.body.items.reduce((acc, item) => acc + item.quantity * item.dish.price, 0),
            date: getDate(),
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                zip_code: req.body.address.zip_code
            },
            user: req.user._id,
            items: req.body.items
        })

        order.save()
        .then(savedOrder => {
            Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
            .then(cart => res.json({success: true}))
            .catch(err => res.json({success: false, error: err}))
        })
        .catch(err => res.json({success: false, error: err}))
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;
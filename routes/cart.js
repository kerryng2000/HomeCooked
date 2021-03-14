const express = require("express");
const router = new express.Router();
const passport = require("passport");
const Cart = require('../models/Cart');

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const item = {
        dish: req.body.dish,
        quantity: req.body.quantity
    }

    Cart.findOne({ user: req.user._id})
    .then(foundCart => {
        if (foundCart)
        {
            let dishes = foundCart.items.map(item => item.dish + '');

            if (dishes.includes(item.dish))
            {                
                Cart.findOneAndUpdate({
                    user: req.user._id,
                    items: {
                        $elemMatch: { dish: item.dish}
                    }
                },
                { $inc: { "items.$.quantity": item.quantity } },
                { new: true})
                .exec()
                .then(cart => res.json(cart))
                .catch(err => res.json({ error: err }))
            }
            else
            {
                foundCart.items.push(item);
                foundCart.save()
                .then(cart => res.json(cart))
            }
        }
        else
        {
            Cart.create({
                user: req.user._id,
                items:[item]
            })
            .then(cart => res.json(cart))
        }
    })
    .catch(err => res.json({ error: err }))
})

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    Cart.findOne({ user: req.user._id })
    .populate("items.dish")
    .exec()
    .then(cart => {
        if (!cart)
            return res.json(null);
        
        res.json(cart);
    })
    .catch(err => res.json({ error: err }))
})

router.put('/removeItem', passport.authenticate("jwt", { session: false }), (req, res) => {
    Cart.findOne({ user: req.user._id })
    .exec()
    .then(cart => {
        cart.items = cart.items.filter(item => item._id != req.body.itemId);
        cart.save()
        .then(newCart => res.json(newCart))
        .catch(err => res.json({ error: err }))
    })
    .catch(err => res.json({ error: err }))
})
module.exports = router;
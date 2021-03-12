const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Dish"
            },
            quantity: Number
        }
    ]
})

module.exports = mongoose.model("Cart", CartSchema);

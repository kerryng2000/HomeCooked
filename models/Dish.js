const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    chef: {
        type: String,
        required: true,
    },
    foodPicture: { 
        type: String, 
        default: "uploads\\defaultfood.jpg"}
}, {
    timestamps: true
})

const Dish = mongoose.model('Dish', DishSchema)

module.exports = Dish
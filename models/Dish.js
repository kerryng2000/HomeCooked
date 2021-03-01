const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema( {
    
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
    }
}, {
    timestamps: true
})

const Dish = mongoose.model('Dish', DishSchema)

module.exports = Dish
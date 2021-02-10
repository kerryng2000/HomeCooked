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
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Dish = mongoose.model('Dish', DishSchema)

module.exports = Dish
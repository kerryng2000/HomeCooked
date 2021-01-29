const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dishSchema = Schema({
    Name: { type: String, required: true},
    description: {type: String, required: true},
},
{
    timestamps:true,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
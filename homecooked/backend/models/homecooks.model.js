const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const homecooksSchema = Schema({
    username: {
        type: String,
        required: true
    },
},
{
    timestamps:true,
});

const Homecook = mongoose.model('Homecook', homecooksSchema);

module.exports = Homecook;
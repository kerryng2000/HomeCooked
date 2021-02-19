const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true},
    profilePicture: { type: String, default: "uploads\\1613356717946profpic.jpg"},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

mongoose.model('User', UserSchema);
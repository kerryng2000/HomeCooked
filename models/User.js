const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true},
    profilePicture: { type: String, default: "uploads\1613356694032profpic.jpg"}
});

mongoose.model('User', UserSchema);
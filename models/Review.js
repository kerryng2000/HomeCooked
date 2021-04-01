const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chef: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);

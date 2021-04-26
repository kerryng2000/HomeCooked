const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    payment_id: { type: String, required: true },
    date: { type: String },
    total: { type: Number },
    address: {
        street: { type : String },
        city: { type: String },
        state: { type: String },
        zip_code: { type: Number }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        dish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dish",
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);

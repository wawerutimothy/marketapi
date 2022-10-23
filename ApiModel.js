const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  stocks: [
    {
      stock: {
        type: String,
        required: true,
      },
      qty: {
        type: String,
        required: true,
      },
      price: {
        type: String,
      },
      lastclose: {
        type: String,
      },
      change: {
        type: String,
      },
      open: {
        type: String,
      },
      high: {
        type: String,
      },
      low: {
        type: String,
      },
      volume: {
        type: String,
      },
      changepercent: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", PortfolioSchema);

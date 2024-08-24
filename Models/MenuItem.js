const mongoose = require("mongoose");

const MenuItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour"],
  },

  isDrink: {
    type: Boolean,
    default: false,
  },

  ingredients: {
    type: [String],
    required: true,
    default: [],
  },

  numOfSales: {
    type: Number,
    required: true,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

module.exports = MenuItem;

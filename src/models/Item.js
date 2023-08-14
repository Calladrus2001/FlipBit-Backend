const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 30
  },
  price: {
    type: Number,
    required: true, 
  },
  sellerEmail: {
    type: String,
    required: true,
    trim: true,
  }, 
  address: {
    type: String,
    required: true,
    trim: true,
  }
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
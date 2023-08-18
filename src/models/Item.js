const mongoose = require("mongoose");
const validator = require("validator");
const ethUtil = require("ethereumjs-util");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 30,
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
    tokenReceiverAddress: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return ethUtil.isValidAddress(value);
        },
        message: (props) => `${props.value} is not a valid Ethereum address`,
      },
    },
    imageUrl: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isURL(value, { protocols: ['http', 'https'] });
        },
        message: (props) => `${props.value} is not a valid image URL`,
      },
    },
  },
  {
    timestamps: true,
  }
);


itemSchema.statics.findBySellerEmail = function (email) {
  return this.find({ sellerEmail: email });
};

itemSchema.methods.getFormattedPrice = function () {
  return `${this.price}`; 
};

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
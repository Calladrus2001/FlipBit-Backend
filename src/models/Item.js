const mongoose = require("mongoose");
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
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
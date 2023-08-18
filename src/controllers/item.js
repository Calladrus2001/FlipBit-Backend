const Item = require("../models/Item");
const {brands, categories} = require("../db/data");

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItemById = async (req, res) => {
  const _id = req.params.id;

  try {
    const item = await Item.findById(_id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateItemById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "description",
    "price",
    "sellerEmail",
    "tokenReceiverAddress",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteItemById = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchCategories = async (req, res) => {
  res.status(201).send(categories);
}

const fetchBrands = async (req, res) => {
  res.status(201).send(brands);
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
  fetchCategories,
  fetchBrands
};

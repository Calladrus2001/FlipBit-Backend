const express = require("express");
const auth = require("../middleware/auth");
const itemController = require("../controllers/item"); // Import your itemController
const router = new express.Router();

router.post("/createItem", auth, itemController.createItem);
router.get("/getAllItems", itemController.getAllItems);
router.get("/getItemById/:id", itemController.getItemById);
router.patch("/updateItemById/:id", auth, itemController.updateItemById);
router.delete("/deleteItemById", auth, itemController.deleteItemById);
router.get("/fetchCategories", itemController.fetchCategories);

module.exports = router;

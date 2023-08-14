const express = require("express");
const auth = require("../middleware/auth");
const itemController = require("../controllers/item"); // Import your itemController
const router = new express.Router();

router.post("/createItem", auth, itemController.createItem);
router.get("/getAllItems", auth, itemController.getAllItems);
router.get("/getItemById/:id", auth, itemController.getItemById);
router.patch("/updateItemById/:id", auth, itemController.updateItemById);
router.delete("/deleteItemById", auth, itemController.deleteItemById);

module.exports = router;

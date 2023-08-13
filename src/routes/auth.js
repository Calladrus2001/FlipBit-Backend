const express = require("express");
const auth = require("../middleware/auth.js");
const userController = require("../controllers/auth.js");
const router = new express.Router();

router.post("/signup", userController.createUser);
router.get("/read", auth, userController.readUser);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);

module.exports = router;

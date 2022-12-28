const express = require("express");

const {
  createUser,
  loginUser,
  identifyUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", identifyUser);

module.exports = router;

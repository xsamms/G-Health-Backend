const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const User = require("../models/userModel");

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  phonenumber: Joi.string().required(),
  password: Joi.string().min(8).max(12).required(),
  address: Joi.string(),
  city: Joi.string(),
  profilePicture: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

router.get("/adminUsers", auth, async (req, res) => {
  try {
    const admins = await User.find({
      isAdmin: "true",
      _id: { $ne: req.user.userId },
    }).select("fullname email profilePicture isAdmin");

    if (!admins) {
      res.status(500).json({ success: false });
    }

    res.send(admins);
  } catch (error) {
    console.log(error);
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ isAdmin: "false" }).select(
      "fullname email profilePicture"
    );

    if (!customers) {
      res.status(500).json({ success: false });
    }
    res.send(customers);
  } catch (error) {
    console.log(error);
  }
});

// test route to verify if our middleware is working
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;

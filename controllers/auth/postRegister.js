const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, address, city } = req.body;

    // check if user exists
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(409).send("E-mail already in use.");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      fullname,
      email: email.toLowerCase(),
      phonenumber,
      password: encryptedPassword,
      address,
      city,
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      email: user.email,
      phonenumber: user.phonenumber,
      token: token,
      fullname: user.fullname,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = postRegister;

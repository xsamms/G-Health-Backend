const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    fullname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    city: { type: String },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1KQB3OITwlpV7m3s_XExbqTuv2NA7rDnhCx8I8671P-XGKzE&s",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

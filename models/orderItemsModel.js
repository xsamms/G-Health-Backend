const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
});

module.exports = mongoose.model("OrderItems", orderItemsSchema);

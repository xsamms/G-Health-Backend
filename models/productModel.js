const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, default: "" },
    productImage: { type: Object },
    images: [{ type: String }],
    brand: { type: String, default: "" },
    price: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantityInStock: { type: Number, required: true, min: 0, max: 255 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);

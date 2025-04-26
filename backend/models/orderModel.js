import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    payment: {
      method: String,
      status: String,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
    totalAmount: Number,
    shippingAddress: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
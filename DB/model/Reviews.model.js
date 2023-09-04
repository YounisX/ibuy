import mongoose, { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    orderId: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.models.Review || model("Review", reviewSchema);
export default reviewModel;

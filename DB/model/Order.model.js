import mongoose, { model, Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref:'User'
    },
note:String,
    products: [
      {
        name: { type: String, required: true },
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1 },
        unitPrice: { type: Number, default: 1, required: true },
        finalPrice: { type: Number, default: 1, required: true },
      },
    ],
  subtotal:{type:Number,required:true}
,
    couponId:{type:Types.ObjectId,ref:"Coupon"},
    totalPrice:{type:Number,required:true},
    status:{type:String,default:"placed",enum:["waitPayment","placed","canceled","delivered","rejected","onWay"]},
    paymentType:{type:String,default:"cash",enum:["cash","card"]},
    reason:String,        

  },
  
  { timestamps: true }
);
const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;

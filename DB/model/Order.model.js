import mongoose, { model, Schema, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
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
subtotal:{type:Number,required:true,default:1}
,
    couponId:{type:Types.ObjectId,ref:"Coupon"},
    totalPrice:{type:Number,required:true,default:1},
    status:{type:String,default:"placed",enum:["waitPayment","placed","cancelled","delivered","rejected","onWay"]},
    paymentType:{type:String,default:"cash",enum:["cash","card"]},
    reason:String,        

  },
  
  { timestamps: true }
);

const CartModel = mongoose.models.Cart || model("Cart", cartSchema);
export default CartModel;

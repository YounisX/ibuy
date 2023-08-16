import mongoose,{model,Schema,Types} from "mongoose";

const cartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: true,
        unique:true
    },
    products:[{
        productId:{
            type:Types.ObjectId, ref:'Product',required:true
        },
        quantity:{type:Number,required : true , default:1}
    }]
    }
, { timestamps: true });

const CartModel = mongoose.models.Cart||model('Cart',cartSchema);
export default CartModel; 

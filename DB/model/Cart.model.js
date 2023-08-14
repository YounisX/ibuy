import mongoose,{model,Schema,Types} from "mongoose";

const cartSchema = new Schema({

    name: {
        type: Object,
        required: true
    },
    createdby: {
        type: Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
    }
, { timestamps: true });

const CartModel = mongoose.models.Cart||model('Cart',cartSchema);
export default CartModel; 
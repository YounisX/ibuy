import mongoose, {Schema,model,Types} from "mongoose";

const couponSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Object
    },
    discount: {
        type: Number,
        required: false
    },
    expireDate: {
        type: Date,
        required: true
    },
    usedBy: [{
        type: Types.ObjectId,
        required: false,
        ref: 'User'
    }],
    createdBy: {
        type: Types.ObjectId,
        required: false, //to be converted to true in the end 
        ref: 'User'
    }
}, { timestamps: true });

const CouponModel = mongoose.models.Coupon||model('Coupon',couponSchema);
export default CouponModel;
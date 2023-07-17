import mongoose from "mongoose";

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const CouponModel = mongoose.models.Coupon||model('Coupon',couponSchema);
export default CouponModel;
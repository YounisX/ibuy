import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
 
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
    },
    discount: {
        type: Number,
        required: false
    },
    paymentPrice: {
        type: Number,
        required: false
    },
    colors: {
        type: [String],
        required: false
    },
    sizes: {
        type: [String],
        required: false
    },
    mainImage: {
        type: Object,
    },
    subImages: {
        type: [Object]
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category'
    },
    subCategoryId: {
        type: Types.ObjectId,
        ref: 'SubCategory'
    },
    brandId: {
        type: Types.ObjectId,
        ref: 'Brand'
    },
    avgRate: {
        type: Number,
    },
    soldItem: {
        type: Number,
    },
    totalAmount: {
        type: Number,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,// to be converted to true after prototype
        ref:'User'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    wishUserList:[{type:Types.ObjectId, ref:'User'}]
}, 
{ timestamps: true,
toJSON:{virtuals:true},
toObject:{virtuals:true}});


productSchema.virtual('review',{
    ref:'Review',
localField:'_id', 
foreignField:'productId'
})

const productModel = mongoose.models.Product||model('Product', productSchema)
export default productModel ;
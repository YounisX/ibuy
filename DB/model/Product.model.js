import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
 
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    paymentPrice: {
        type: Number,
        required: true
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
        required: true
    },
    subImages: {
        type: [Object]
    },
    categoryId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    subCategoryId: {
        type: Types.ObjectId,
        required: true,
        ref: 'SubCategory'
    },
    brandId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Brand'
    },
    avgRate: {
        type: Number,
        required: false
    },
    soldItem: {
        type: Number,
        required: false
    },
    totalAmount: {
        type: Number,
        required: false
    },
    createdBy:{
        type:Types.ObjectId,
        required:false, // to be converted to true after prototype
        ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,// to be converted to true after prototype
        ref:'User'
    },
    wishUserList:[{type:Types.ObjectId, ref:'User'}]
}, 
{ timestamps: true });

const productModel = mongoose.models.Product||model('Product', productSchema)
export default productModel ;
import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        required: true
    },
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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    paymentPrice: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        required: true
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
        required: true
    },
    soldItem: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdBy:{
        type:Types.ObjectId,
        required:true, // to be converted to true after prototype
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
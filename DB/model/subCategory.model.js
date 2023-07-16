import mongoose, { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{type:String,required:true},
    image:{
        type:Object,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        required:false, // to be converted to true after prototype
        ref:'User'
    },
    categoryId:{type:String,required:true,ref:'Category'},
    customId:{type:String,required:true,unique:true}

},{timestamps:true})

const subCategoryModel = mongoose.models.SubCategory || model('SubCategory', subCategorySchema)
export default subCategoryModel;
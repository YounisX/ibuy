import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug:{type:String,required:true},
    img:{
        type:Object,
        required:false
    },
    createdBy:{
        type:Types.ObjectId,
        required:false, // to be converted to true after prototype
        ref:'User'
    }
    
},{timestamps:true})

const categoryModel = mongoose.models.Category|| model('Category', categorySchema)
export default categoryModel;
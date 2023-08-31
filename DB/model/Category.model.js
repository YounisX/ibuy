import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
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
        required:true, // to be converted to true after prototype
        ref:'User'
    },
    updatedBy:{
        type:Types.ObjectId,// to be converted to true after prototype
        ref:'User'
    }

},
{timestamps:true,
toJSON:{virtuals:true},
toObject:{virtuals:true}})

categorySchema.virtual('SubCategory',{
    ref: 'SubCategory',
    localField: '_id',
    foreignField: 'categoryId',
  });

const categoryModel = mongoose.models.Category|| model('Category', categorySchema)
export default categoryModel;



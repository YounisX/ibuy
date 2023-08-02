import mongoose,{model,Schema,Types} from "mongoose";

const brandSchema = new Schema({
    image: {
        type: Object,
        required: true 
    },
    slug: {
        type: String,
        required: true 
    },
    name: {
        type: Object,
        required: true
    },
    createdby: {
        type: Types.ObjectId,
        required: false, //to be converted to true
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        required: false, //to be converted to true
        ref: 'User'
    }
    }
, { timestamps: true });

const brandModel = mongoose.models.Brand||model('Brand',brandSchema);
export default brandModel ; 
import { Schema, model } from "mongoose";


const userSchema = new Schema({
    firstName:String,
    lastName:String,
    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    address:{
        type:String
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin','HR'],
        required:true
    },
    forgetCode:{
        type:Number,
        default:null,
    },

    status:{
        type:String,
        default:'offline',
        enum:['online','offline']
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    image: Object,
    DOB: String,
    changePasswordTime:{
        type:Date

    }
}, {
    timestamps: true
})


const userModel = model('User', userSchema)
export default userModel
import reviewModel from "../../../../DB/model/Reviews.model.js";
import { AsyncHandler } from "../../../utils/errorHandling.js";
import orderModel from './../../../../DB/model/Order.model.js';

export const createReview = AsyncHandler(async(req,res,next) => {

const{productId} = req.params;
const data = req.body; 

const order = await orderModel.findOne({userId:req.user._id,status:'delivered',"products.product":productId}    
);
if(!order){
return next(new Error("cannot review order before recieveing", { cause: 400 }));
}
const checkReview = await reviewModel.findOne({createdBy:req.user._id,productId,orderId:order._id})
if(checkReview){
return next(new Error("Already Reviewed", { cause: 400 }));
}
const review = await reviewModel.create({...data,createdBy:req.user._id,productId,orderId:order._id})
res.status(201).json({message:"review created successfully",review})
}
)


    


export const updateReview = AsyncHandler(async(req,res,next) => {

    const{productId,reviewId} = req.params;
    const data = req.body; 
   
const review = await reviewModel.updateOne({_id:reviewId,productId},req.body)
    res.status(201).json({message:"review created successfully",review})
    }
    )
    
    
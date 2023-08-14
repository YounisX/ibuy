import { AsyncHandler } from "../../../utils/errorHandling.js";
import productModel from './../../../../DB/model/Product.model.js';

export const createCart = AsyncHandler(async(req,res,next)=>{

    const { quantity , productId } = req.body;
    const product  = await productModel.findById(productId);
    if (!product){
        return next (new Error('invalid product id or not found'),{cause:400})
    }
    if(product.stock < quantity || product.isDeleted ){
        product.wishUserList.push(req.user._id)
        await  productModel.updateOne({_id:productId},{$addToSet:{wishUserList:req.user._id}})
        return next (new Error(`only ${product.stock} is available`),{cause:400})


    }
})
import { AsyncHandler } from "../../../utils/errorHandling.js";
import productModel from './../../../../DB/model/Product.model.js';

export const createCart = AsyncHandler(async(req,res,next)=>{

    const { quantity , productId } = req.body;
    const product  = await productModel.findById(productId);
    if (!product){
        return next (new Error('invalid product id or not found'),{cause:400})
    }
})
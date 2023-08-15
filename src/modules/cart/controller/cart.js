import { AsyncHandler } from "../../../utils/errorHandling.js";
import productModel from './../../../../DB/model/Product.model.js';
import CartModel from './../../../../DB/model/Cart.model.js';

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
    const cart = await CartModel.findOne({_id:req.user._id})
    if(!cart){
        const generatedCart = await CartModel.create({
            userId:req.user._id,
            products:[{productId,quantity}]
        })
        return res.status(200).json({generatedCart})
    }
    //! if exist and and option 1 - update , 2 -  push new item 
})
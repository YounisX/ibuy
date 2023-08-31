import productModel from '../../../../DB/model/Product.model.js';
import CouponModel from './../../../../DB/model/Coupon.model.js';
import { AsyncHandler } from './../../../utils/errorHandling.js';
import orderModel from './../../../../DB/model/Order.model.js';
import CartModel from './../../../../DB/model/Cart.model.js';
import cartModel from './../../../../DB/model/Cart.model.js';


export const createOrder = AsyncHandler( async(req,res,next)=>{

const {address,phone,name,paymentType,note} = req.body; 

if(!req.body.products){
    const cart = await CartModel.findOne({userId:req.user._id})

if(!cart?.products?.length){
    return next(new Error("Empty Cart", { cause: 400 }));
}
req.body.isCart = true;
req.body.products = cart.products;

}


if(name){
const coupon  = await CouponModel.findOne({name:name.toLowerCase()});
if(!coupon){
    return next(new Error("coupon not found", { cause: 400 }));
}
if(coupon.expireDate.getTime() < Date.now()){
    return next(new Error("coupon expired", { cause: 400 }));
}
if(coupon.usedBy.includes(req.user._id)){
    return next(new Error("coupon used", { cause: 400 }));
}
req.body.coupon = coupon;

}

//todo checking the product availabilty and the quantity of it 

const finalProductList = []
const productsId  = []
let subtotal = 0;
for (let product of req.body.products){
const checkProduct =  await productModel.findOne({
    _id: product.productId,
    stock:{$gte:product.quantity},
    isDeleted:false
})

if(!checkProduct){
return next(new Error("product not found or quantity order more than the stock", { cause: 400 }));
}

if(req.body.isCart){
    product=product.toObject();
}

productsId.push(product.productId);
product.name = checkProduct.name;
product.unitPrice = checkProduct.finalPrice;
product.finalPrice =product.quantity*checkProduct.finalPrice.toFixed(2);
finalProductList.push(product);
subtotal += product.finalPrice;
console.log(productsId);

}



const order = await orderModel.create({
    userId:req.user._id,
    address,
    phone,
    note,
    products:finalProductList,
    subtotal,
    couponId:req.body.coupon?._id,
    totalPrice: subtotal -(subtotal *((req.body.coupon?.discount||0)/100)).toFixed(2),
    paymentType,
    status:paymentType == 'card' ? "placed": 'waitpayment' 
})

// decrease product stock 
for(const product of req.body.products){
await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.quantity}})
}
//add users that used the coupon
if(req.body.coupon){

    await CouponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
}
    
//clear items selected in cart 
if(req.body.isCart){
await CartModel.updateOne({userId:req.user._id},{products:[]}) 
}
else{
    await CartModel.updateOne({userId:req.user._id},{
        $pull:{
            products:{
            productId:{$in:productsId}
            }
        }})


return res.json(order);
}
})
; 
 
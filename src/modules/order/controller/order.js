import productModel from '../../../../DB/model/Product.model.js';
import CouponModel from './../../../../DB/model/Coupon.model.js';
import { AsyncHandler } from './../../../utils/errorHandling.js';
import orderModel from './../../../../DB/model/Order.model.js';
import CartModel from './../../../../DB/model/Cart.model.js';
import cartModel from './../../../../DB/model/Cart.model.js';
import createInvoice from '../../../utils/pdf.js';

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
status:paymentType == 'cash' ? "placed": 'waitPayment' 
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


}


const invoice = {
    shipping: {
    name: req.user.userName.toLowerCase(),
    address: req.user.address,
    city: "Cairo",
    state: "Cairo",
    country: "Egypt",
    postal_code: 12084
  },
items: order.products,  
subtotal:subtotal,
total: order.totalPrice,
  invoice_nr: order._id
};

await createInvoice(invoice, "invoice.pdf");

return res.json(order);

})
; 
 

export const cancelOrder = AsyncHandler( async(req,res,next)=>{ 
const{orderId,reason}=req.params;

    const order = await orderModel.findOne({_id:orderId,userId:req.user._id})
if(!order){
    return next(new Error("order not found", { cause: 400 }));
}
console.log(order.status);
if((order?.status !='placed' && order.paymentType =='cash') || (order?.status !='waitPayment' && order.paymentType=='card')){
return next(new Error(`cannot cancel order after changed to ${order.status}`, { cause: 400 }));
    }
const cancelOrder = await orderModel.updateOne({_id:orderId},{status:'canceled',reason,updatedBy:req.user._id})

if(!cancelOrder.matchedCount){
return next(new Error("failed to cancel order", { cause: 400 }));
}
//decrease product stock 

for (const product of order.products){
await productModel.updateOne({_id:product.productId},{$inc:{stock:product.quantity}})
    //push user coupon usedBy
if(order.couponId){
    await CouponModel.updateOne({_id:order.couponId},{$pull:{usedBy:req.user._id}})
}
    
    
}


return res.json({message:"done"});
}


)

export const updateOrderStatusByAdmin = AsyncHandler(async (req, res, next) => {
    const { orderId } = req.params;
  
    // Check if the order exists
    const order = await orderModel.findOne({ _id: orderId });
    if (!order) {
      return next(new Error("Order not found", { cause: 400 }));
    }


    // Check if any product in the order is canceled

const isAnyProductCanceled = order.status === 'canceled';

if (isAnyProductCanceled) {
      return next(new Error("Cannot update order status. Some products are canceled.", { cause: 400 }));
    }
    // Update the order status to 'delivered'
    const updatedOrder = await orderModel.updateOne(
      { _id: orderId },
      { status: 'delivered' }
    );
  
    if (!updatedOrder.matchedCount) {
      return next(new Error("Failed to update order status", { cause: 400 }));
    }
  
    return res.json({ message: "Order status updated to 'delivered'" });
  });
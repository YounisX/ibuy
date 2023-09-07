import { AsyncHandler } from "../../../utils/errorHandling.js";
import productModel from "./../../../../DB/model/Product.model.js";
import CartModel from "./../../../../DB/model/Cart.model.js";


export const createCart = AsyncHandler(async (req, res, next) => {
  const { quantity, productId } = req.body;

  //todo check if that product exist
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new Error("invalid product id or not found"), { cause: 400 });
  }

  //todo check if that product exist

  if (product.stock < quantity || product.isDeleted) {
    await productModel.updateOne(
      { _id: productId },
      { $addToSet: { wishUserList: req.user._id } }
    );
    return next(new Error(`only ${product.stock} is available`), {
      cause: 400,
    });
  }

  //todo check if the user has a CART

  const cart = await CartModel.findOne({ userId: req.user._id });
  if (!cart) {
    const generatedCart = await CartModel.create({
      userId: req.user._id,
      products: [{ productId, quantity }],
    });
    return res.status(200).json({ generatedCart });
  }

  //! if exist and and option 1 - update , 2 -  push new item
 let matchProduct = false;
  for (let i = 0; i< cart.products.length ; i++) {
    if (cart.products[i].productId.toString() == productId) {
      cart.products[i].quantity = quantity;
        matchProduct = true;
      break;
    }
  }

if(matchProduct==false){
    cart.products.push({productId,quantity})
}
  await cart.save();
  return res.json({ cart });
})


export const clearCart = AsyncHandler(async (req, res, next) => {
  //todo check if the user has a CART
  const cart = await CartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error("Cart not found"), { cause: 404 });
  }

  // Clear the products array in the cart
  cart.products = [];

  await cart.save();
  return res.json({ cart });
});


export async  function  deleteItemsFromCart(productsId,userId){
  const cart = await CartModel.updateOne({userId},{
    $pull:{
        products:{
        productId:{$in:productsId}
        }
    }})
    return cart;
}



export const deleteItems = AsyncHandler(async (req, res, next) => {

const {productIds} = req.body;

const cart =await deleteItemsFromCart(productIds,req.user._id);

  return res.json({ cart });
});


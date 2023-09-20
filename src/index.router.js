import morgan from 'morgan'
import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import branRouter from './modules/brand/brand.router.js'
import cartRouter from './modules/cart/cart.router.js'
import categoryRouter from './modules/category/category.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import orderRouter from './modules/order/order.router.js'
import productRouter from './modules/product/product.router.js'
import reviewsRouter from './modules/reviews/reviews.router.js'
import subcategoryRouter from './modules/subcategory/subcategory.router.js'
import userRouter from './modules/user/user.router.js'
import { globalErrorHandling } from './utils/errorHandling.js'

import bodyParser from 'body-parser'

const initApp = (app, express) => {
    app.use(morgan('dev'))
    //convert Buffer Data
    app.use(express.json({}))
    
   // Add the body-parser middleware
      // Now you should be able to access req.body.products as an object
    //Setup API Routing 
   app.use(bodyParser.json());


    app.use(`/auth`, authRouter)
    app.use(`/user`, userRouter)
    app.use(`/product`, productRouter)
    app.use(`/category`, categoryRouter)
    app.use(`/subCategory`, subcategoryRouter)
    app.use(`/reviews`, reviewsRouter)
    app.use(`/coupon`, couponRouter)
    app.use(`/cart`, cartRouter)
    app.use(`/order`, orderRouter)
    app.use(`/brand`, branRouter)

 
    app.all('*', (req, res, next) => {
        res.status(404).send("In-valid Routing Plz check url  or  method")
    })
    app.use(globalErrorHandling);
    connectDB()

}



export default initApp
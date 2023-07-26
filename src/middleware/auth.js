import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { AsyncHandler } from './../utils/errorHandling.js';
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";

verifyToken

const auth =  () => {
        return AsyncHandler( async (req,res,next)=>{

  
        const { authorization } = req.headers;

        if (!authorization?.startsWith(process.env.BEARER_KEY)) {
            return next(new Error('invalid bearer key',{cause:401}))
        }
        const token = authorization.split(process.env.BEARER_KEY)[1]
      
        if (!token) {
            return next(new Error('invalid Token ',{cause:401}))

        }

        const decoded = verifyToken({token})
        if (!decoded?.userId) {
            return res.json({ message: "In-valid token payload" })
        }
        const authUser = await userModel.findById(decoded.userId).select('userName email role')
        if (!authUser) {
            return res.json({ message: "Not register account" })
        }
        req.user = authUser;
        return next()
  
    
}
)
}

export default auth
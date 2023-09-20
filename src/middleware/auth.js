import userModel from "../../DB/model/User.model.js";
import { AsyncHandler } from './../utils/errorHandling.js';
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";

export const roles = {
    Admin:"Admin",
    User:"User",
    HR:"HR"
}


const auth =  (roles=[]) => {
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

        const user = await userModel.findById(decoded.userId).select('userName email role changePasswordTime')
        //checking if there is any changes happend to main token data like password or email update
       if (parseInt(user.changePasswordTime?.getTime()/1000)> decoded.iat){
        return next(new Error('Token expired',{cause:400}))
       }

        if (!user) {
            return res.json({ message: "Not register account" })
        }

        if(!roles.includes(user.role)){
            return next(new Error('not authenticated user',{cause:402}))
        }
        req.user = user;
        return next()
  
    
}
)
}

export default auth ;
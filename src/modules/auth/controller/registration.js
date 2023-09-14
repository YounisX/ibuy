import { AsyncHandler } from "./../../../utils/errorHandling.js";
import userModel from "./../../../../DB/model/User.model.js";
import { generateToken, verifyToken } from "./../../../utils/GenerateAndVerifyToken.js";
import sendEmail from "../../../utils/email.js";
import { hash, compare } from "../../../utils/HashAndCompare.js";

export const signup = AsyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  // cheking if ther user Exist
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return next(new Error("this email Alraady Exist!", { cause: 409 }));
  }
  //sending email
  const token = generateToken({ payload: { email }, expiresIn: 60 * 5 });
  const refreshToken = generateToken({
    payload: { email },
    expiresIn: 60 * 60 * 24 * 30,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;

  const html = `<!DOCTYPE html>
   <html>
   <head>
   
     <meta charset="utf-8">
     <meta http-equiv="x-ua-compatible" content="ie=edge">
     <title>Email Confirmation</title>
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <style type="text/css">
     /**
      * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
      */
     @media screen {
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 400;
         src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
       }
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 700;
         src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
       }
     }
     /**
      * Avoid browser level font resizing.
      * 1. Windows Mobile
      * 2. iOS / OSX
      */
     body,
     table,
     td,
     a {
       -ms-text-size-adjust: 100%; /* 1 */
       -webkit-text-size-adjust: 100%; /* 2 */
     }
     /**
      * Remove extra space added to tables and cells in Outlook.
      */
     table,
     td {
       mso-table-rspace: 0pt;
       mso-table-lspace: 0pt;
     }
     /**
      * Better fluid images in Internet Explorer.
      */
     img {
       -ms-interpolation-mode: bicubic;
     }
     /**
      * Remove blue links for iOS devices.
      */
     a[x-apple-data-detectors] {
       font-family: inherit !important;
       font-size: inherit !important;
       font-weight: inherit !important;
       line-height: inherit !important;
       color: inherit !important;
       text-decoration: none !important;
     }
     /**
      * Fix centering issues in Android 4.4.
      */
     div[style*="margin: 16px 0;"] {
       margin: 0 !important;
     }
     body {
       width: 100% !important;
       height: 100% !important;
       padding: 0 !important;
       margin: 0 !important;
     }
     /**
      * Collapse table borders to avoid space between cells.
      */
     table {
       border-collapse: collapse !important;
     }import { hash } from './../../../utils/HashAndCompare';

     a {
       color: #1a82e2;
     }
     img {
       height: auto;
       line-height: 100%;
       text-decoration: none;
       border: 0;
       outline: none;
     }
     </style>
   
   </head>
   <body style="background-color: #e9ecef;">
   
     <!-- start preheader -->
     <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
       A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
     </div>
     <!-- end preheader -->
   
     <!-- start body -->
     <table border="0" cellpadding="0" cellspacing="0" width="100%">
   
       <!-- start logo -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
               <td align="center" valign="top" style="padding: 36px 24px;">
                 <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                   <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                 </a>
               </td>
             </tr>
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end logo -->
   
       <!-- start hero -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                 <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
               </td>
             </tr>
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end hero -->
   
       <!-- start copy block -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
   
             <!-- start copy -->
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                 <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with you can safely delete this email.</p>
               </td>
             </tr>
             <!-- end copy -->
   
             <!-- start button -->
             <tr>
               <td align="left" bgcolor="#ffffff">
                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
                   <tr>
                     <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                       <table border="0" cellpadding="0" cellspacing="0">
                         <tr>
                           <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                             <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Email</a>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>
             <!-- end button -->
   
             <!-- start copy -->
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                 <p style="margin: 0;">confirmation time out ? click the link below send new confirmation email </p>
                 <p style="margin: 0;"><a href="${refreshLink}" target="_blank">click here</a></p>
               </td>
             </tr>
             <!-- end copy -->
   
   
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end copy block -->
   
     </table>
     <!-- end body -->
   
   </body>
   </html>`;

  if (!await sendEmail({ to: email, subject: "confirmation email", html })) {
    return next(new Error("email rejected", { cause: 400 }));
  }
  //todo Hashing password
  const hashPassword = hash({ plaintext: password });
  
   //todo creating User ; 

   const {_id}= await userModel.create({userName,email,password:hashPassword})
   return res.json({_id})

});


export const confirmEmail  = AsyncHandler( async(req,res,next)=>{
  const{token} = req.params;
  const {email} = verifyToken({token,signature:process.env.TOKEN_SIGNATURE});
  if(!email){
    return next( new Error('invalid Token',{cause:400}))
  }
const user = await userModel.updateOne({email:email.toLowerCase()},{confirmEmail:true},{new:true});
  if(user.matchedCount){
    console.log(user);
return res.redirect(`${process.env.LINK}`)
  }
  else{
    // return res.render('confirmEmail',{message:'not registered account'})
    return res.json({message:"not registered account"})
  }

})


export const newConfirmEmail  =  AsyncHandler(async(req,res,next)=>{
  const{token} = req.params;
  const {email} = verifyToken({token,signature:process.env.TOKEN_SIGNATURE});
  if(!email){
    return next( new Error('invalid Token',{cause:400}))
  }
  const user = await userModel.findOne({email})
  if(!user){
    return next( new Error('invalid not registered acocunt',{cause:400}))
  }
  if(user.confirmEmail){
    return res.redirect(`${process.env.LINK}`) ;
  }
  const newToken = generateToken({ payload: { email }, expiresIn: 60 * 10 });
 
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`;
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`;

  const html = `<!DOCTYPE html>
   <html>
   <head>
   
     <meta charset="utf-8">
     <meta http-equiv="x-ua-compatible" content="ie=edge">
     <title>Email Confirmation</title>
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <style type="text/css">
     /**
      * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
      */
     @media screen {
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 400;
         src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
       }
       @font-face {
         font-family: 'Source Sans Pro';
         font-style: normal;
         font-weight: 700;
         src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
       }
     }
     /**
      * Avoid browser level font resizing.
      * 1. Windows Mobile
      * 2. iOS / OSX
      */
     body,
     table,
     td,
     a {
       -ms-text-size-adjust: 100%; /* 1 */
       -webkit-text-size-adjust: 100%; /* 2 */
     }
     /**
      * Remove extra space added to tables and cells in Outlook.
      */
     table,
     td {
       mso-table-rspace: 0pt;
       mso-table-lspace: 0pt;
     }
     /**
      * Better fluid images in Internet Explorer.
      */
     img {
       -ms-interpolation-mode: bicubic;
     }
     /**
      * Remove blue links for iOS devices.
      */
     a[x-apple-data-detectors] {
       font-family: inherit !important;
       font-size: inherit !important;
       font-weight: inherit !important;
       line-height: inherit !important;
       color: inherit !important;
       text-decoration: none !important;
     }
     /**
      * Fix centering issues in Android 4.4.
      */
     div[style*="margin: 16px 0;"] {
       margin: 0 !important;
     }
     body {
       width: 100% !important;
       height: 100% !important;
       padding: 0 !important;
       margin: 0 !important;
     }
     /**
      * Collapse table borders to avoid space between cells.
      */
     table {
       border-collapse: collapse !important;
     }import { hash } from './../../../utils/HashAndCompare';

     a {
       color: #1a82e2;
     }
     img {
       height: auto;
       line-height: 100%;
       text-decoration: none;
       border: 0;
       outline: none;
     }
     </style>
   
   </head>
   <body style="background-color: #e9ecef;">
   
     <!-- start preheader -->
     <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
       A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
     </div>
     <!-- end preheader -->
   
     <!-- start body -->
     <table border="0" cellpadding="0" cellspacing="0" width="100%">
   
       <!-- start logo -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
               <td align="center" valign="top" style="padding: 36px 24px;">
                 <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                   <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                 </a>
               </td>
             </tr>
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end logo -->
   
       <!-- start hero -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                 <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
               </td>
             </tr>
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end hero -->
   
       <!-- start copy block -->
       <tr>
         <td align="center" bgcolor="#e9ecef">
           <!--[if (gte mso 9)|(IE)]>
           <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
           <tr>
           <td align="center" valign="top" width="600">
           <![endif]-->
           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
   
             <!-- start copy -->
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                 <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with you can safely delete this email.</p>
               </td>
             </tr>
             <!-- end copy -->
   
             <!-- start button -->
             <tr>
               <td align="left" bgcolor="#ffffff">
                 <table border="0" cellpadding="0" cellspacing="0" width="100%">
                   <tr>
                     <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                       <table border="0" cellpadding="0" cellspacing="0">
                         <tr>
                           <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                             <a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Email</a>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>
             <!-- end button -->
   
             <!-- start copy -->
             <tr>
               <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                 <p style="margin: 0;">confirmation time out ? click the link below send new confirmation email </p>
                 <p style="margin: 0;"><a href="${refreshLink}" target="_blank">click here</a></p>
               </td>
             </tr>
             <!-- end copy -->
   
   
           </table>
           <!--[if (gte mso 9)|(IE)]>
           </td>
           </tr>
           </table>
           <![endif]-->
         </td>
       </tr>
       <!-- end copy block -->
   
     </table>
     <!-- end body -->
   
   </body>
   </html>`;

  if (!await sendEmail({ to: email, subject: "confirmation email", html })) {
    return next(new Error("email rejected", { cause: 400 }));
  }
  return res.send('<p>a new confirmation sent to your email</p>') 
  

})


export const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await userModel.findOne({ email });

  // Check if the user exists
  if (!user) {
    return next(new Error("Invalid email or password.", { cause: 401 }));
  }
if(!user.confirmEmail){
  return next(new Error("email not confirmed check email", { cause: 401 }));
}
  // Check if the provided password matches the stored hashed password
  const isPasswordValid = compare({ plaintext: password, hashValue: user.password });

  if (!isPasswordValid) {
    return next(new Error("Invalid email or password.", { cause: 401 }));
  }
  const tokenPayload = { userId: user._id, role: user.role,name:user.userName };
  const token = generateToken({payload:tokenPayload, signature:process.env.TOKEN_SIGNATURE}, {
    expiresIn: 60*30
  });


  user.status = "online";
  await user.save();


  return res.json({ message:'Success',token });
});



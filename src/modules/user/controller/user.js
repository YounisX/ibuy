import { AsyncHandler } from "./../../../utils/errorHandling.js";
import userModel from "../../../../DB/model/User.model.js";
import sendEmail from "../../../utils/email.js";
import { customAlphabet } from "nanoid";
import { hash, compare } from "../../../utils/HashAndCompare.js";

export const sendCode = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const generatedResetCode = customAlphabet("123456789", 4);
  const resetCode = generatedResetCode();
  const user = await userModel.findOneAndUpdate(
    { email },
    { forgetCode: resetCode }
    ,{new:true}
  );
  if (user) {
    return user
      ? res.json({ user })
      : next(new Error("this email doesnt exist"), { cause: 404 });
  }
  //sending email
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
                               <p>this is your Reset Code : ${resetCode}</p>
                             </td>
                           </tr>
                         </table>
                       </td>
                     </tr>
                   </table>
                 </td>
               </tr>
               <!-- end button -->
     
     
     
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

  if (!(await sendEmail({ to: email, subject: "reset password", html }))) {
    return next(new Error("email rejected", { cause: 400 }));
  }
});

export const resetPassword = AsyncHandler(async (req, res, next) => {
  const { code, password,email } = req.body;
  const user = await userModel.findOne({ email});
  if (!user) {
    return next(new Error("this email doesnt exist"), { cause: 404 });
  }
  console.log(user);
  if (user.forgetCode != code) {
    return next(new Error("wrong verfication Code", { causer: 400 }));
  }

  const hashPassword = hash({ plaintext: password });

  const compareWithOldPassword = compare({
    plaintext: password,
    hashValue: user.password,
  });

  if (compareWithOldPassword) {
    return next(new Error("can not apply the old password", { cause: 401 }));
  }

  user.password = hashPassword;
  user.forgetCode = null;
  user.changePasswordTime = Date.now();
  await user.save();
  return res.json("password updated successfully");
  //sending email
});

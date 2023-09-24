import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
// import initApp from './src/index.router.js'
import chalk from 'chalk'
import initApp from './src/index.router.js'
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })


initApp(app,express)


const port = process.env.PORT || 3000


app.listen(process.env.PORT,()=>{
 console.log(chalk.ansi256(0).bgAnsi256(112)(`Example app listening on port  ${port} `));
}) 



//todo practice for GraphQL 
// const users = [
//     {
//         name:"ahmeed",
//         email:"je mappelle croissent"
//     },
//     {
//         name:"sayed",
//         email:"je mappelle greenBurger"
//     },
// ]
// const userType  = new GraphQLObjectType({
//     name:"userType",
//     description:"haha",
//     fields:{
//         name:{type:GraphQLString},
//         email:{type:GraphQLString}
//     }
// })
// const schema = new GraphQLSchema({
// query:new GraphQLObjectType({
//     name:"shit",
//     description:"optional",
//     fields:{
//         sayHello:{
//             type:GraphQLString,
//             resolve:()=>{
//                 return 'hello World'
//             }
//         },
//         search:{
//             type:userType,
//             args:{
//                 name:{type:new GraphQLNonNull(GraphQLString)}
//             },
//             resolve:(parent,args)=>{
//                 const {name} = args; 
//                 const user = users.find(ele=>{
//                     return ele.name == name?.toLowerCase()
//                 })
//                 return user
//             }
//         }
//     }
// })
// })

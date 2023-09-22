import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
// import initApp from './src/index.router.js'
import chalk from 'chalk'
import { graphqlHTTP } from 'express-graphql'
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })


import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({
query:new GraphQLObjectType({
    name:"shit",
    description:"optional",
    fields:{
        sayHello:{
            type:GraphQLString,
            resolve:()=>{
                return 'hello World'
            }
        }
    }
})
})



const port = process.env.PORT || 3000
app.use('/graphql', graphqlHTTP({schema,graphiql:true}));


app.get('/sayHello', (req, res) => res.send('Hello World!'))


app.listen(process.env.PORT,()=>{
 console.log(chalk.ansi256(0).bgAnsi256(112)(`Example app listening on port  ${port} `));
}) 



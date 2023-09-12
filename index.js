import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import cors from 'cors'


//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import initApp from './src/index.router.js'
import chalk from 'chalk'
const app = express()
// setup port and the baseUrl
const port = process.env.PORT || 3000
initApp(app ,express)
app.use(cors({})) //allow access from any



app.listen(process.env.PORT,()=>{
 console.log(chalk.ansi256(0).bgAnsi256(112)(`Example app listening on port  ${port} `));
}) 



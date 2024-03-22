import express from "express"
import {MongoDBURL, PORT} from "./config.js"
import mongoose from 'mongoose'
import { Book } from "./models/book.js"
import bookRoutes from './routes/books.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())//all origins with default of cors

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))//allow custom origins





app.use('/books',bookRoutes)

mongoose.connect(MongoDBURL).then(()=>{
    console.log('successful connection to database')
    app.listen(PORT, ()=>{
        console.log('here is me at '+ PORT)
    })
}).catch(error=>{
    console.log(error)
})
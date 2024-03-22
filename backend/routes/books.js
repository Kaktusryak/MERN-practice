import express from 'express'
import { Book } from '../models/book.js'

const router = express.Router()




router.post('/',async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:'not all req fields are presented'})
        }
        const newBook = {
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})


router.get('/', async (req,res)=>{
    try {
        const books = await Book.find()
        return res.status(200).json({
            count:books.length,
            data:books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

router.get('/:bookId', async (req,res)=>{
    try {
        const {bookId} = req.params
        const book = await Book.findById(bookId)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})


router.put('/:bookId', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'not all req fields are presented' })
        }
        const {bookId} = req.params
        const result = await Book.findByIdAndUpdate(bookId,req.body)
        if(!result){
            return res.status(404).json({message:'book not found'})
        }else{
            return res.status(200).json({message:'book updated'})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:bookId', async(req,res)=>{
    try {
        
        const {bookId} = req.params
        const result = await Book.findByIdAndDelete(bookId)
        if(!result){
            return res.status(404).json({message:'book not found'})
        }else{
            return res.status(200).json({message:'book deleted'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})


export default router
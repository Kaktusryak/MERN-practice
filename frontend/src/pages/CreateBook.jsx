
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import {Link}from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'


const CreateBook = () => {
    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [publishYear,setPublishYear] = useState('')
    const [loading,setLoading] = useState(false)
    const  navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const handleSaveBook = ()=>{
        if(!title || !author || !publishYear){
            enqueueSnackbar('All fields must be filled', {variant:'error'})
            // alert('All fields must be filled')
        }else{
            const data = {
                title,
                author,
                publishYear
            } 
            setLoading(true)
            axios.post('http://localhost:5555/books',data).then(()=>{
                setLoading(false)
                enqueueSnackbar('Book created successfully', {variant:'success'})
                navigate('/')
            }).catch((error)=>{
                console.log(error)
                setLoading(false)
                enqueueSnackbar('Something went wrong', {variant:'error'})
                // alert('Something went wrong')
            })
        }
        
    }

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4 '>Create book</h1>
            {loading ? <Spinner/> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input type='text' value={author} onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish year</label>
                    <input type='number' value={publishYear} onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
                </div>
                <button className='p-2 bg-sky-300 m-8 text-white' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default CreateBook

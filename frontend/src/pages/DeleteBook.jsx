import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
const DeleteBook = () => {
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()
    const {enqueueSnackbar} = useSnackbar()
    const handleDeleteBook = () =>{
        setLoading(true)
        axios.delete('http://localhost:5555/books/' + id).then(()=>{
            setLoading(false)//why?
            navigate('/')
            enqueueSnackbar('Book deteted successfully',{variant:'success'})
            
        }).catch(error=>{
            console.log(error)
            setLoading(false)
            // alert('Something went wrong')
            enqueueSnackbar('Something went wrong',{variant:'error'})
        })

    }
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4 '>Delete book</h1>
        {loading ? <Spinner/>: ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl 2-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are You sure You want to delete this book?</h3>
            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
                Delete
            </button>
        </div>

    </div>
  )
}

export default DeleteBook

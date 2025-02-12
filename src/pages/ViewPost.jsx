import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { addCommentApi, getBlogByIdApi } from '../services/allApi'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCommentApi } from '../services/allApi'
import { loginResponseContext } from '../context/contextShare'



function ViewPost() {
    const [comments, setComments] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const { setLoginResponse } = useContext(loginResponseContext)
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/dashboard')
    }

    const [user, setUser] = useState({})
    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            setUser(JSON.parse(sessionStorage.getItem("existingUser")))
        }

    }, [])

    const { id } = useParams()
    const [blog, setBlog] = useState(null)

    const getBlogDetails = async () => {

        const result = await getBlogByIdApi(id)
        setBlog(result.data)

    }

    useEffect(() => {

        getBlogDetails()
    }, [id])



    const [comment, setComment] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, []);


    const handleAddComment = async () => {
        if (!comment.trim()) {
            toast.info('Please enter a comment')
        }

        const reqBody = { postId: id, comment }

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };


            const result = await addCommentApi(reqBody, reqHeader)
            if (result.status === 200) {
                toast.success('Comment added successfully')
                setComment("")
                fetchComments()
            } else {
                toast.error('Something went wrong')
            }

        }
    }
    const fetchComments = async () => {
        const result = await getCommentApi(id)

        if (result.status === 200) {
            setComments(result.data)
            console.log(result.data)
        } else {
            toast.error('Something went wrong')
        }
    };

    useEffect(() => {

        fetchComments()
    }, [id])

    const handleLogout = () => {

        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        toast.success('Logout Successful')

        setTimeout(() => {
            setLoginResponse(false)
            navigate('/')

        }, 2000)

    }


    return (
        <>
            <nav className='container'>

                <div className='flex justify-between items-center mt-4 gap-3'>
                    <Link style={{ textDecoration: 'none' }} to={'/dashboard'}>
                        <div className='flex items-center'>
                            <img src="/Blogger-logo-3d-button-vector-PNG-removebg-preview.png" alt="noimage" className='w-[50px]' />
                            <h2 className='font-semibold mt-3 text-[2rem] ms-1 hidden lg:block text-gray-700'>Writely</h2>
                        </div>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center"
                        >
                            <img src='/78-786207_user-avatar-png-user-avatar-icon-png-transparent-removebg-preview.png' alt='noimg' className='w-[50px]' />


                        </button>
                        {isOpen && (
                            <div className="absolute right-0 w-[200px] mt-2 bg-white border-1 rounded-lg">
                                <div className='ms-3 mt-3'>
                                    <p className='font-semibold m-0 p-0 text-[18px]'>{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                                <hr />
                                <ul className='m-0 p-0'>
                                    <Link style={{ textDecoration: 'none' }} to={'/myposts'} ><li className='ms-3 mt-2 text-gray-700 hover:underline'>Manage Posts</li></Link>
                                    <li onClick={handleLogout} className='ms-3 mt-2 mb-3 cursor-pointer text-gray-700 hover:underline'>Log out</li>
                                </ul>
                            </div>
                        )}
                    </div>

                </div>

            </nav>
            <>
                <div className='container mt-4'><button onClick={handleBack} className='rounded-[50%] p-2 bg-[#f99426] ms-1'><ArrowBackIcon className='text-white' /></button></div>
                <div className='container px-5 py-4'>
                    {blog ? <div>
                        <h1 className='font-bold text-[3rem]'>{blog.title}</h1>
                        <img src={`${serverUrl}/upload/${blog.blogimage}`} alt="noimage" className='w-[90%] h-[400px] mx-auto mt-5 object-cover rounded' />
                        <p className='mt-5 text-justify font-medium text-[18px]'>{blog.description}</p>
                    </div> :
                        <div className='p-5 flex justify-center items-center w-full'><h4 className='mt-5'>Loading...</h4></div>
                    }
                </div>
                <div className='container px-5 py-4'>
                    <h1 className='font-semibold text-[2rem]'>Comments</h1>
                    <div className='border border-dark rounded mt-4 p-4'>
                        {comments?.length > 0 ? comments?.map((item) => <div className='flex mb-4'>
                            <div><img src="/78-786207_user-avatar-png-user-avatar-icon-png-transparent-removebg-preview.png" alt="noimg" className='w-[50px]' /></div>
                            <div className='px-3 mt-2'>
                                <h5>{item.username}</h5>
                                <p className='text-justify text-[16px]'>{item.comment}</p>
                            </div>
                        </div>) : <div className='flex justify-center items-center w-full p-4'><h4 className=''>No Comments</h4></div>}


                    </div>
                </div>
                <div className='container px-5 py-4 mb-[50px] '>
                    <h1 className='font-semibold text-[2rem]'>Leave a Comment</h1>
                    <textarea value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Write your comment here'
                        className='form-control mt-4 p-3 rounded text-[16px] placeholder:text-[18px] border border-dark'
                        rows={5}>
                    </textarea>

                    <div className='flex justify-end'><button onClick={handleAddComment} className='text-[18px] rounded-[25px] text-white bg-[#f99426] px-4 py-2 font-semibold mt-3 '>Submit</button></div>

                </div>
                <ToastContainer position='top-center' autoClose={2000} theme='coloured' />
            </>
        </>
    )
}

export default ViewPost
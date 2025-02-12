import React, { useContext, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'
import { addBlogApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginResponseContext } from '../context/contextShare'

function AddPost() {
    const [isOpen, setIsOpen] = useState(false)
    const { setLoginResponse } = useContext(loginResponseContext)
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/dashboard')
    }

    const [preview, setPreview] = useState("")
    const [key, setKey] = useState(1)
    const [token, setToken] = useState("")
    const [blogDetails, setBlogDetails] = useState({
        title: "",
        description: "",
        blogimage: ""
    })


    const handleFile = (e) => {
        setBlogDetails({ ...blogDetails, blogimage: e.target.files[0] })
    }

    useEffect(() => {
        if (blogDetails.blogimage) {
            setPreview(URL.createObjectURL(blogDetails.blogimage))
        }
    }, [blogDetails.blogimage])

    const handleCancel = () => {
        setBlogDetails({
            title: "",
            description: "",
            blogimage: ""
        })
        setPreview("")
        if (key == 1) {
            setKey(0)
        }
        else {
            setKey(1)
        }
    }

    const handleAdd = async () => {
        const { title, description, blogimage } = blogDetails
        if (!title || !description || !blogimage) {
            toast.info('Fill the form completely')
        }
        else {

            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append('description', description)
            reqBody.append('blogimage', blogimage)

            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await addBlogApi(reqBody, reqHeader)
                // console.log(result); 
                if (result.status == 200) {
                    toast.success(`Blog Added Successfully`)
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 2000);
                } else if (result.status == 406) {
                    toast.warning(result.response.data)
                    handleCancel()
                }
                else {
                    toast.error('Something Went Wrong')
                }
            }
            else {
                toast.warning('Something Went Wrong')
            }
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
    }, [])


    const [user, setUser] = useState({})
    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            setUser(JSON.parse(sessionStorage.getItem("existingUser")))
        }

    }, [])

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
                <div className='container px-5 mt-3 mb-4'>
                    <div className='flex justify-center items-center'>
                        <div
                            className="bg-[#f99426] rounded-[25px] p-5 w-full max-w-2xl"
                        >
                            <h1 className="text-white font-bold text-center">Create New Post</h1>
                            <div className="my-4 w-full">

                                <input
                                    type="text"
                                    placeholder="Title" value={blogDetails.title} onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })}
                                    className="w-full border py-2 px-3 text-[20px] rounded-md focus:outline-[#f99426] placeholder:text-gray-700"

                                />
                                <textarea value={blogDetails.description} onChange={(e) => setBlogDetails({ ...blogDetails, description: e.target.value })}
                                    rows={4}
                                    placeholder="Description"
                                    className="w-full border py-2 px-3 text-[20px] rounded-md mt-3 mb-1 focus:outline-[#f99426]  placeholder:text-gray-700"
                                />
                                <label htmlFor="blogimage" className='w-full'>
                                    <input onChange={(e) => handleFile(e)} key={key} type="file" id="blogimage" className='hidden' />
                                    {preview ? <img src={preview} alt='noimage' className='mx-auto mt-2 object-cover rounded' style={{ width: '100%', height: '250px' }} /> : <img src={'/3820184-removebg-preview.png'} alt='noimage' className='mx-auto mt-2 rounded' style={{ width: '250px' }} />}



                                </label>
                            </div>
                            <div className="flex justify-between">
                                <button onClick={handleCancel}

                                    className="bg-red-500 border-inherit text-white rounded-[25px] px-[35px] py-2 text-[20px] font-semibold"
                                >
                                    Cancel
                                </button>
                                <button onClick={handleAdd} className="bg-green-500 border-inherit text-white rounded-[25px] px-[35px] py-2 text-[20px] font-semibold">
                                    Add Post
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <ToastContainer position='top-center' autoClose={2000} theme='coloured' />
            </>
        </>
    )
}

export default AddPost
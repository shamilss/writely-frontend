import React, { useContext, useEffect, useState } from 'react'
import MyPostcard from '../components/MyPostcard'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from 'react-router-dom'
import { removeUserBlogApi, userBlogApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginResponseContext } from '../context/contextShare'



function MyPost() {
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


    const [userBlog, setUserBlog] = useState([])
    const getUserBlog = async () => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const result = await userBlogApi(reqHeader)
            setUserBlog(result.data)
        }
    }
    const handleDelete = async (id) => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await removeUserBlogApi(id, reqHeader);
            if (result.status === 200) {
                toast.success('Blog Deleted Successfully')
                setUserBlog(userBlog.filter(blog => blog._id !== id))
            } else {
                toast.error('Something Went Wrong')
            }
        }
    };
    useEffect(() => { getUserBlog() }, [])
    const handleUpdateBlog = (updatedBlog) => {
        setUserBlog((prevBlogs) =>
            prevBlogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
        );
    };

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
                                    {/* <Link style={{ textDecoration: 'none' }} to={'/myprofile'}><li className='ms-3 text-gray-700 hover:underline'>My Profile</li></Link> */}
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
                    <h1>My Posts</h1>
                    <div className='grid md:grid-cols-3 mt-5 gap-5'>

                        {userBlog?.length > 0 ? userBlog?.map((item) => <div className="col-span-1">
                            <MyPostcard item={item} onDelete={handleDelete} onUpdate={handleUpdateBlog} />
                        </div>
                        ) :
                            <div className='p-5 flex justify-center items-center md:col-span-3 col-span-1 w-full'><h4 className='mt-5'>No Blogs Added</h4></div>

                        }

                    </div>
                </div>

            </>
            <ToastContainer position='top-center' autoClose={2000} theme='coloured' />
        </>
    )
}

export default MyPost
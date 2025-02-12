import React, { useContext, useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { Link, useNavigate } from 'react-router-dom'
import { loginResponseContext } from '../context/contextShare'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Topbar({ setSearchKey }) {
    const [isOpen, setIsOpen] = useState(false)
    const { setLoginResponse } = useContext(loginResponseContext)
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate('/addpost')
    }
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
                    <div className='flex items-center gap-3'>
                        <TextField onChange={(e) => setSearchKey(e.target.value)}
                            size="small"
                            className="lg:w-[350px] w-[100%] bg-white"
                            type="text"
                            placeholder="Search"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon className="text-gray-700" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                borderRadius: "25px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "25px",
                                    paddingLeft: "10px"
                                },
                                "& .MuiInputBase-input": {
                                    paddingLeft: "10px",
                                },
                                "& .MuiInputBase-input::placeholder": {
                                    color: "grey",
                                    opacity: 1,
                                },
                            }}
                            variant="outlined"
                        />

                        <button onClick={handleAdd} className='text-[18px] rounded-[25px] text-white bg-[#f99426] px-4 py-2 font-semibold hidden lg:block '>Create Post</button>
                        <button onClick={handleAdd} className='flex items-center justify-center text-[18px] rounded-[50%] text-white bg-[#f99426] p-2 font-semibold lg:hidden'><AddIcon /></button>
                    </div>

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



            <ToastContainer position='top-center' autoClose={2000} theme='coloured' />
        </>
    )
}

export default Topbar
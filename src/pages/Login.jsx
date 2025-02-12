import React, { useContext, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginApi } from '../services/allApi'
import { loginResponseContext } from '../context/contextShare'


function Login() {

  const navigate = useNavigate()
  const { setLoginResponse } = useContext(loginResponseContext)
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      toast.info('Invalid Input')
    }
    else {
      const result = await loginApi({ email, password })
      if (result.status == 200) {
        setLoginResponse(true)
        toast.success('Login Successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setUserDetails({
          email: '',
          password: ''
        })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
      else {
        toast.error('Something Went Wrong')
      }


    }

  }
  return (
    <>
      <div id='loginsection' style={{ width: '100%' }} className='bg-[#f99426] flex justify-center items-center '>
        <div className='p-[8rem]'>
          <Link style={{ textDecoration: 'none', display: 'inline-block', maxWidth: 'fit-content' }} to={'/'}><button className='text-white text-[20px] flex items-center font-semibold mb-2 ms-3'><FontAwesomeIcon className='me-1 text-[20px]' icon={faHouse} />Home</button></Link>
          <div className='grid md:grid-cols-2 '>
            <div className="col-span-1 bg-white md:rounded-l-[25px] md:rounded-none rounded-t-[25px] shadow-lg flex flex-col justify-center items-center p-5">
              <h1 className='text-gray-700 font-bold'>Welcome Back!</h1>
              <img src="/Login-rafiki (3) (1).png" alt="noimage" className='w-[75%] lg:rounded-l-[25px] lg:rounded-none rounded-t-[25px]' />
            </div>
            <div className="col-span-1 bg-[#f99426] md:rounded-r-[25px] md:rounded-none rounded-b-[25px] shadow-lg p-5">
              <h1 className='font-bold text-center text-white'>Hello, User!</h1>
              <h3 className='text-center text-white'>Sign in to your Account</h3>
              <div className='container flex flex-col items-center justify-center mt-4'>
                <TextField onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='w-[90%] bg-white rounded'
                  type='text'
                  placeholder='Email ID'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon className='text-gray-700' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                      color: 'grey',
                      opacity: 1,

                    },
                  }}
                  variant="outlined"
                />
                <TextField onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='w-[90%] mt-3 bg-white rounded'
                  type='password'
                  placeholder='Password'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon className='text-gray-700' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                      color: 'grey', //
                      opacity: 1,
                    },
                  }}
                  variant="outlined"
                />
                <div><button onClick={handleLogin} className='bg-white text-[#f99426] rounded-[25px] px-[5rem] py-2 mt-4 text-[18px] font-semibold'>SIGN IN</button></div>
              </div>

              <h6 className='text-white text-[18px] text-center mt-4'>Don't have an account? <Link style={{ textDecoration: 'none' }} to={'/register'}><span className='font-semibold text-white underline'>Create Account</span></Link></h6>


            </div>

          </div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme='coloured' />
    </>
  )
}

export default Login
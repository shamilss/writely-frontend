import React from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import EmailIcon from '@mui/icons-material/Email'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='container grid md:grid-cols-3'>
        <div className="col-span-1">
          <div className='flex items-center'>
            <img src="/Blogger-logo-3d-button-vector-PNG-removebg-preview.png" alt="noimage" className='w-[50px]' />
            <h2 className='font-semibold text-[#f99426] text-[2rem] mt-3 ms-1'>Writely</h2>
          </div>
          <p className='font-semibold mt-2 text-justify text-[18px]'>A dynamic blogging platform where creativity meets expression. Whether you're sharing stories, insights, or experiences, Writely empowers voices and connects minds through the power of words. Write, express, and inspire!</p>

        </div>
        <div className="col-span-1 md:flex flex-col items-center">
          <h2 className='font-semibold text-[#f99426] mt-3'>Quick Links</h2>
          <p className='mt-2 font-semibold text-[18px]'><Link className='text-gray-700' style={{textDecoration:'none'}} to={'/login'}>LOGIN</Link></p>
          <p className='font-semibold text-[18px]'><Link className='text-gray-700' style={{textDecoration:'none'}} to={'/register'}>REGISTER</Link></p>
          <p className='font-semibold text-[18px]'><a className='text-gray-700' style={{textDecoration:'none'}} href='#home'>HOME</a></p>
          <p className='font-semibold text-[18px]'><a className='text-gray-700' style={{textDecoration:'none'}} href='#features'>FEATURES</a></p>
          <p className='font-semibold text-[18px]'><a className='text-gray-700' style={{textDecoration:'none'}} href='#contact'>CONTACT US</a></p>
        </div>
        <div className="col-span-1">
          <h2 className='font-semibold text-[#f99426] mt-3'>Newsletter</h2>
          <p className='mt-2 font-semibold text-[17px]'>Subscribe to our newsletter for exclusive writing tips, creative insights, and the latest updates to fuel your storytelling journey.</p>
          <TextField className='w-[100%]'
            type='text'
            placeholder='Email ID'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon className='text-[#f99426]' />
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
          <button className='w-[100%] mt-3 py-2 rounded text-white bg-[#f99426] font-semibold'>SUBSCRIBE</button>
        </div>

      </div>
      <div className='container pt-2'><hr /></div>
      <div className='container'>
        <p className='font-semibold'>© 2025 Writely Website. All Rights Reserved</p>
      </div>

    </>
  )
}

export default Footer
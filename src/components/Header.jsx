import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <>
            <nav className='container mt-3' >
                <div className='flex justify-between items-center py-2'>
                   <Link style={{textDecoration:'none'}} to={'/'}>
                        <div className='flex items-center'>
                            <img src="/Blogger-logo-3d-button-vector-PNG-removebg-preview.png" alt="noimage" className='w-[50px]' />
                            <h2 className='font-semibold mt-3 text-[2rem] ms-1 hidden lg:block text-gray-700'>Writely</h2>
                        </div>
                   </Link>
                    <Link to={'/login'}><button className='text-[18px] rounded-[25px] text-white bg-[#f99426] px-4 py-2 font-semibold'>Login / Register</button></Link>
                </div>
            </nav>
        </>
    )
}

export default Header
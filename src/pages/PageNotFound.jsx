import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
      <div style={{ height: '100vh', width: '100%' }} className="flex justify-center items-center flex-col">
        <div>
          <img style={{ width: '100%' }} src='/electrocuted-caveman-animation-404-error-page-ezgif.com-crop.gif' alt='noimage' />
        </div>
        <div className='mt-5 mb-4'>
          <h2 className='font-bold'>Look like you're lost</h2>
          <h4>the page you are looking for not available!</h4>
        </div>
        <Link to={'/'}><button className='bg-orange-500 py-2 px-4 rounded-[25px] text-[20px] text-white font-semibold'>Go to Home</button></Link>
      </div>

    </>
  )
}

export default PageNotFound
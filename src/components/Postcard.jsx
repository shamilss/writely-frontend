import React from 'react'
import { serverUrl } from '../services/serverUrl'

function Postcard({ item }) {

    return (
        <>
            <div className='bg-white rounded-[25px] p-5 text-gray-700 mb-4 shadow flex flex-col justify-evenly h-full'>
                <img className='rounded-lg w-full h-[180px] object-cover mx-auto' src={`${serverUrl}/upload/${item.blogimage}`} alt="noimage" />
                <h1 className='mt-4'>{item.title}</h1>
                <p style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "400px",
                    height: "4.5em"
                }} className='text-justify mt-3 text-[16px]'>{item.description}</p>
            </div>
        </>
    )
}

export default Postcard
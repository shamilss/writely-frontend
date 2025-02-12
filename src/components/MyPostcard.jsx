import React, { useEffect, useState } from 'react'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { serverUrl } from '../services/serverUrl'
import { setBlogVisibilityApi, updateUserBlogApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


function MyPostcard({ item, onDelete, onUpdate }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => {
        setIsModalOpen(false);
        handleCancel()
    }
    const [key, setKey] = useState(0)
    const [preview, setPreview] = useState("")
    const [blogDetails, setBlogDetails] = useState({
        title: item.title,
        description: item.description,
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
            title: item.title,
            description: item.description,
            blogimage: ""
        })
        setPreview("")
        if (key == 0) {
            setKey(1)
        }
        else {
            setKey(0)
        }
    }

    const handleUpdate = async () => {
        const { title, description, blogimage } = blogDetails
        if (!title || !description) {
            toast.info('Invalid Input')
        }
        else {

            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append('description', description)
            preview ? reqBody.append('blogimage', blogimage) : reqBody.append('blogimage', item.blogimage)

            const token = sessionStorage.getItem('token')

            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserBlogApi(item._id, reqBody, reqHeader)
                // console.log(result);
                if (result.status === 200) {


                    onUpdate(result.data)
                    setIsModalOpen(false)


                }
                else {
                    toast.warning('Something Went Wrong')
                    handleCancel()
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await updateUserBlogApi(item._id, reqBody, reqHeader)
                if (result.status === 200) {


                    onUpdate(result.data)
                    setIsModalOpen(false)

                }
                else {
                    toast.warning('Something Went Wrong')
                    handleCancel()
                }

            }

        }
    }

    const handleVisibility = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await setBlogVisibilityApi(item._id, { visibility: !item.visibility }, reqHeader)

            if (result.status === 200) {
                onUpdate({ ...item, visibility: result.data.visibility })
            } else {
                toast.error("Failed to update visibility");
            }
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    };

    return (
        <>
            <div className='bg-white rounded-[25px] p-5 text-gray-700 mb-4 shadow flex flex-col justify-evenly h-full'>
                <img className='rounded-lg w-full h-[180px] object-cover mx-auto' src={`${serverUrl}/upload/${item.blogimage}`} alt="noimage" />

                <h1 className='mt-4'>{item?.title}</h1>

                <p style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "400px",
                    height: "4.5em"
                }} className='text-justify mt-3 text-[16px]'>{item?.description}
                </p>

                <div className='mt-4 flex justify-center gap-4'>
                    <button onClick={handleVisibility}>{item.visibility ? (
                        <VisibilityIcon fontSize='large' className=' text-green-500' />
                    ) : (
                        <VisibilityOffIcon fontSize='large' className=' text-red-500' />
                    )}</button>
                    <button onClick={openModal}>
                        <FontAwesomeIcon icon={faPenToSquare} className='text-[25px] text-blue-500' />
                    </button>
                    <button onClick={() => onDelete(item._id)}>
                        <FontAwesomeIcon icon={faTrash} className='text-[25px] text-orange-500' />
                    </button>
                </div>
            </div>


            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-[#f99426] rounded-[25px] p-5 w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-white font-bold text-center">Edit My Post</h1>
                        <div className="my-4">

                            <input value={blogDetails.title}
                                onChange={(e) => setBlogDetails({ ...blogDetails, title: e.target.value })}
                                type="text"
                                placeholder="Title"
                                className="w-full border py-2 px-3 text-[20px] rounded-md focus:outline-[#f99426] placeholder:text-gray-700"

                            />
                            <textarea value={blogDetails.description}
                                onChange={(e) => setBlogDetails({ ...blogDetails, description: e.target.value })}
                                rows={4}
                                placeholder="Description"
                                className="w-full border py-2 px-3 text-[20px] rounded-md mt-3 mb-1 focus:outline-[#f99426]  placeholder:text-gray-700"
                            />
                            <label htmlFor="blogimage" className='w-full'>
                                <input type="file" id="blogimage" className='hidden' key={key} onChange={(e) => handleFile(e)} />
                                <img src={preview ? preview : `${serverUrl}/upload/${item.blogimage}`}
                                    alt='noimage' style={{ width: '100%', height: '250px' }} className='mt-2 mx-auto object-cover rounded' />
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 border-inherit text-white rounded-[25px] px-[35px] py-2 text-[20px] font-semibold"
                            >
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="bg-green-500 border-inherit text-white rounded-[25px] px-[35px] py-2 text-[20px] font-semibold">
                                Update Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position='top-center' autoClose={2000} theme='coloured' />

        </>

    )
}

export default MyPostcard
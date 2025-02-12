import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';




function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [Name, setName] = useState('')
    const [DOB, setDOB] = useState('')
    const [Email, setEmail] = useState('')
    const [Mobile, setMobile] = useState('')
    const ManageEdit = () => {
        setIsEditing(!isEditing);
    }
      const navigate = useNavigate()
        const handleBack=()=>{
            navigate('/dashboard')
        }
    return (
        <>
            <Topbar />
            <>
                <div className='container mt-4'><button onClick={handleBack} className='rounded-[50%] p-2 bg-[#f99426] ms-1'><ArrowBackIcon className='text-white' /></button></div>
                <div className='container'>
                    <div className='w-full px-5 mb-5'>
                        <h1 className='mt-4'>My Profile</h1>
                        <div className='flex justify-center items-center px-3 mt-[40px]'>
                            <div className='grid md:grid-cols-2 bg-[#f99426] rounded-[25px] w-[100%] shadow-lg'>
                                <div className="col-span-1 bg-[#f99426] md:rounded-l-[25px] md:rounded-none rounded-t-[25px] p-5 flex flex-col justify-center items-center">
                                    <label htmlFor="profileimage">
                                        <input type="file" id="profileimage" className='d-none' />
                                        <img src="/78-786207_user-avatar-png-user-avatar-icon-png-transparent-removebg-preview.png" alt="noimg" className='w-[50%] mx-auto h-auto' />

                                    </label>
                                    <h2 className='text-white font-semibold text-center mt-2'>Username</h2>
                                    <h4 className='text-white font-semibold text-center'>Designation</h4>
                                </div>
                                <div className="col-span-1 bg-white md:rounded-r-[25px] md:rounded-none rounded-b-[25px] p-5">
                                    <div className='flex flex-col justify-center'>
                                        <div className='flex items-center'>
                                            <h3>Information</h3>
                                            <button onClick={ManageEdit}>{!isEditing ? <FontAwesomeIcon icon={faPenToSquare} className='ms-2 text-[#8c4cff] text-[20px]' /> :
                                                <FontAwesomeIcon icon={faCheck} className='ms-2 text-[#8c4cff] text-[20px]' />}</button>
                                        </div>

                                        <div className='mt-3'>
                                            <h5>Full Name</h5>
                                            <div className='flex justify-center items-center mt-2 w-full'><input onChange={(e) => setName(e.target.value)} value={Name} type="text" readOnly={!isEditing} className={`w-full p-2 rounded outline-none transition-all duration-300 ${isEditing ? "outline-[#8c4cff]" : " bg-gray-100"}`} />

                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <h5>DOB</h5>
                                            <div className='flex justify-center items-center mt-2 w-full'><input onChange={(e) => setDOB(e.target.value)} value={DOB} type="date" readOnly={!isEditing} className={`w-full p-2 rounded outline-none transition-all duration-300 ${isEditing ? "outline-[#8c4cff]" : " bg-gray-100"}`} />

                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <h5>Email</h5>
                                            <div className='flex justify-center items-center mt-2 w-full'><input onChange={(e) => setEmail(e.target.value)} value={Email} type="text" readOnly={!isEditing} className={`w-full p-2 rounded outline-none transition-all duration-300 ${isEditing ? "outline-[#8c4cff]" : " bg-gray-100"}`} />

                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <h5>Mobile</h5>
                                            <div className='flex justify-center items-center mt-2 w-full'><input onChange={(e) => setMobile(e.target.value)} value={Mobile} type="text" readOnly={!isEditing} className={`w-full p-2 rounded outline-none transition-all duration-300 ${isEditing ? "outline-[#8c4cff]" : " bg-gray-100"}`} />

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}

export default Profile
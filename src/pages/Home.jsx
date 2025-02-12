import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faListCheck, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'

function Home() {
  return (
    <>
      <Header />
      <>
        <div id='home'>
          <div className='container grid md:grid-cols-2 py-[3rem] my-[3.5rem]'>
            <div className="col-span-1">
              <h1 className='font-bold text-[2.5rem]'>Write. Express. Inspire.</h1>
              <p className='text-justify mt-4 text-[24px]'>Writely is more than just a blogging platform—it’s a space where creativity thrives, ideas come to life, and every voice matters. Whether you're a seasoned writer or a passionate storyteller, Writely provides the tools and community to help you express yourself effortlessly. From insightful articles to personal reflections, every story counts. Join us to write, inspire, and connect with like-minded individuals. Your journey of expression starts here!</p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <img src="/d3464a4351fdf340ccb6bb37c281381a.gif" alt="noimage" className='w-[100%]  lg:w-[90%] ' />
            </div>
          </div>
        </div>

        <div id='features' className='my-[3.5rem]'>
          <div className='container'>
            <h1 className='font-bold text-center'>~ FEATURES ~</h1>
            <div className='grid md:grid-cols-3 py-[3rem] my-[3.5rem] gap-6'>
              <div className="col-span-1 bg-[#f99426] text-white rounded-[25px] p-5">
             <div className='flex items-center justify-center'>
                <FontAwesomeIcon icon={faEye} className='text-[60px]' />
             </div>
             <div>
              <h2 className='font-semibold mt-5 text-center'>Post Visibility Control</h2>
              <p className='font-medium mt-4 text-[18px] text-justify'>The Post Visibility Control feature allows users to manage the accessibility of their blog posts with ease. Users can toggle the visibility of a post between public and private, ensuring complete control over who can view their content.</p>
             </div>
              </div>
              <div className="col-span-1 bg-[#f99426] text-white rounded-[25px] p-5">
             <div className='flex items-center justify-center'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[60px]' />
             </div>
             <div>
              <h2 className='font-semibold mt-5 text-center'>Search & Pagination</h2>
              <p className='font-medium mt-4 text-[18px] text-justify'>The Search & Pagination feature enhances user experience by making content discovery efficient and seamless. Users can quickly find blog posts using keywords while navigating through posts effortlessly with a structured pagination system.</p>
             </div>
              </div>
              <div className="col-span-1 bg-[#f99426] text-white rounded-[25px] p-5">
             <div className='flex items-center justify-center'>
                <FontAwesomeIcon icon={faListCheck} className='text-[60px]' />
             </div>
             <div>
              <h2 className='font-semibold mt-5 text-center'>User Blog Management</h2>
              <p className='font-medium mt-4 text-[18px] text-justify'>The User Blog Management feature empowers users to efficiently create, edit, update, and delete their blog posts with ease. It provides a seamless experience for managing personal content while ensuring flexibility and control over published posts.</p>
             </div>
              </div>
              
            </div>
            
          </div>
        </div>



        <div id='contact' className='py-[3rem] my-[3.5rem]'>
          <div className='container'>
            <div className='grid md:grid-cols-2'>
              <div className="col-span-1 bg-white md:rounded-l-[25px] md:rounded-none rounded-t-[25px] shadow flex flex-col justify-start p-[4rem]">
                <h2 className='font-semibold text-[#f99426]'>Let's Get In Touch</h2>
                <p className='text-justify mt-2 font-medium text-[18px]'>Have questions or ready to book a session? We’re here to help. Let’s connect and turn your moments into lasting memories.</p>
                <div class="flex items-center gap-4 mt-2">
                  <FontAwesomeIcon icon={faEnvelope} size='2xl' className='text-[#f99426]' />
                  <h4 class="font-medium lg:mt-1">writely@gmail.com</h4>
                </div>
                <div class="flex items-center gap-4 mt-2">
                  <FontAwesomeIcon icon={faPhone} size='2xl' className='text-[#f99426]' />
                  <h4 class="font-medium lg:mt-1">+91-8943668355</h4>
                </div>
                <h3 class="font-semibold mt-4">Connect with us : </h3>
                <div class="flex items-center gap-6 mt-3">
                  <a href="https://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faSquareFacebook} className='text-[40px] text-[#f99426] hover:scale-125 transition-transform duration-200 ease-in-out' /></a>
                  <a href="https://x.com/i/flow/login" target="_blank"><FontAwesomeIcon icon={faSquareXTwitter} className='text-[40px] text-[#f99426] hover:scale-125 transition-transform duration-200 ease-in-out' /></a>
                  <a href="https://www.instagram.com/accounts/login" target="_blank"><FontAwesomeIcon icon={faSquareInstagram} className='text-[40px] text-[#f99426] hover:scale-125 transition-transform duration-200 ease-in-out' /></a>
                </div>
              </div>
              <div className="col-span-1 bg-[#f99426] md:rounded-r-[25px] md:rounded-none rounded-b-[25px] shadow-lg p-[4rem]">
              <h2 className='font-semibold text-white'>Contact Us</h2>
              <div className='mt-4'>
                <input type="text" placeholder='Name' className='form-control rounded' />
                <input type="text" placeholder='Email' className='form-control rounded mt-3' />
                <input type="text" placeholder='Phone' className='form-control rounded mt-3' />
                <textarea placeholder='Message' rows={4} className='form-control rounded mt-3'></textarea>
               <div className='mt-3'> <button className='rounded bg-white text-[#f99426] font-semibold py-2 px-4' >Submit</button></div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  )
}

export default Home
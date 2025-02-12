import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import Postcard from '../components/Postcard'
import { Link } from 'react-router-dom'
import { allBlogApi } from '../services/allApi'

function Dashboard() {
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [allBlog, setAllBlog] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getAllBlog = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await allBlogApi(searchKey, currentPage, reqHeader)
        if (result?.data) {
          setAllBlog(result.data.data)
          setTotalPages(result.data.totalPages || 1)
        } else {
          setAllBlog([])
          setTotalPages(1)
        }
      } catch (error) {
        console.error("Something Went Wrong")
        setAllBlog([])
        setTotalPages(1)
      }
    }
  };

  useEffect(() => {
    getAllBlog();
  }, [searchKey, currentPage])

  useEffect(() => {
    getAllBlog();
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  };

  return (
    <>
      <Topbar setSearchKey={setSearchKey} />
      <div className='container p-5'>
        <h1>All Posts</h1>
        <div className='grid md:grid-cols-3 mt-5 gap-5'>
          {allBlog?.length > 0 ? (
            allBlog.map((item) => (
              <div className="col-span-1" key={item._id}>
                <Link style={{ textDecoration: 'none' }} to={`/viewpost/${item._id}`}>
                  <Postcard item={item} />
                </Link>
              </div>
            ))
          ) : (
            <div className='p-5 flex justify-center items-center md:col-span-3 col-span-1 w-full'><h4 className='mt-5'>No Blogs Found</h4></div>
          )}
        </div>

        {allBlog?.length>0 && <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded font-semibold ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f99426]  text-white'}`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-2 rounded font-semibold ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#f99426]  text-white'}`}
          >
            Next
          </button>
        </div>}
      </div>
    </>
  );
}

export default Dashboard

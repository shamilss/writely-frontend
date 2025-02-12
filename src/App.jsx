import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PageNotFound from "./pages/PageNotFound"
import Dashboard from "./pages/Dashboard"
import AddPost from "./pages/AddPost"
import MyPost from "./pages/MyPost"
import ViewPost from "./pages/ViewPost"
import { useContext } from 'react'
import { loginResponseContext } from './context/contextShare'



function App() {
  const { loginResponse } = useContext(loginResponseContext)


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/dashboard'  element={loginResponse ? <Dashboard/> : <PageNotFound/>} />
        <Route path='/addpost'  element={loginResponse ? <AddPost/> : <PageNotFound/>} />
        <Route path='/myposts' element={loginResponse ? <MyPost/> : <PageNotFound/>}/>
        <Route path='/viewpost/:id'  element={loginResponse ? <ViewPost/> : <PageNotFound/>} />
      </Routes>

    </>
  )
}

export default App

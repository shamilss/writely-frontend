import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register api
export const requestApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login request
export const loginApi = async (reqBody) =>{
    return await commonApi ('POST',`${serverUrl}/login`,reqBody,"")
}

//addblog api
export const addBlogApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/addblog`,reqBody,reqHeader)
}

//getuserblog api
export const userBlogApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/userblog`,"",reqHeader)
}

//removeuserblog api
export const removeUserBlogApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/removeuserblog/${id}`,{},reqHeader)
}

//updateuserblog api
export const updateUserBlogApi = async(id,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/updateuserblog/${id}`,reqBody,reqHeader)
}

// Get all blogs with pagination
export const allBlogApi = async (searchKey, page, reqHeader) => {
    return await commonApi('GET',`${serverUrl}/allblog?search=${searchKey}&page=${page}&limit=3`,"",reqHeader )
}

//getblogbyid api
export const getBlogByIdApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/blog/${id}`)
  }

//addcomment api
export const addCommentApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/addcomment`, reqBody, reqHeader)
};

//getcomment api
export const getCommentApi = async (postId) => {
    return await commonApi('GET', `${serverUrl}/getcomment/${postId}`, "","")
};

//setblogvisibility api
export const setBlogVisibilityApi = async (id, visibility, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/blogvisibility/${id}`, { visibility }, reqHeader)
};

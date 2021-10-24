import axios from "axios"

//require post
export const reqBlog = async (data)=>{
    //console.log(data)
   return axios({
        method:'get',
        url:'/posts',
        params:data
    })
}

//update post
export const updateBlog = async (data)=>{
   return axios({
        method:'patch',
        url:'/posts/update',
        data:data
    })
}

//delete post
export const deleteBlog = async (data)=>{
   return axios({
        method:'delete',
        url:'/posts/delete',
        params:data
    })
}

//create post
export const createBlog = async (data)=>{
    return axios({
         method:'post',
         url:'/posts/create',
         data:data
     })
 }
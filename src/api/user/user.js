import axios from "axios"

//require userlist
export const reqUserList = async (data)=>{
    return axios({
        method:'get',
        url:'/users/userlist',
        params:data
    })
}

//update user
export const updateUser = async (data)=>{
   //console.log(data)
    return axios({
        method:'patch',
        url:'/users/update',
        params:data
    })
}

//delete user
export const deleteUser = async (data)=>{
   return axios({
        method:'delete',
        url:'/users/delete',
        params:data
    })
}

//create user
export const createUser = async (data)=>{
   // console.log(data)
    return axios({
         method:'post',
         url:'/users/create',
         params:data
     })
 }
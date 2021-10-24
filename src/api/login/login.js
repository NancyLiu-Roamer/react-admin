import axios from "axios"

//login
export async function reqLogin(values) {
    return axios({
      method: "post",
      url: "/login",
      data:values
    }) 
}

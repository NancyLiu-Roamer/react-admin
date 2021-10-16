import axios from "axios";

// const qs = require('query-string')

//login
export async function reqLogin(values) {
  return axios({
    method: "post",
    url: "/login",
    data:values
  })

}

//get product category
export async function reqProductCate() {
  return axios({
    method: "get",
    url: "/products/category"
  })

}

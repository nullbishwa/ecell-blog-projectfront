import axios from "axios";

const API = axios.create({
  baseURL: "https://ecell-blog-project-1-5t3c.onrender.com", // your backend
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API

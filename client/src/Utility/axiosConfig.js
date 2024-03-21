import axios from "axios";

const axiosBase = axios.create({
  //local host
  baseURL: "http://localhost:5550/api", 
  //deployed version
// baseURL: "https://evangadi-forum-backend-v25r.onrender.com/api",
});

export default axiosBase;

import axios from "axios";

const axiosInstanceWithoutHeaders = axios.create({
  baseURL: "http://localhost:8080",
  // headers: {}
});

export default axiosInstanceWithoutHeaders;

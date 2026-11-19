import axios from "axios";

/**
 * Single, shared Axios instance for the whole application.
 * All HTTP calls must go through this instance — never use fetch().
 */
const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true; // send cookies automatically

export default axios;
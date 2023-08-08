import axios from "axios";

const axiosCustomer = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})
export default axiosCustomer
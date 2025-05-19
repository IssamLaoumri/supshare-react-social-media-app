import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/v1`,
    headers : {
        "Content-Type": "application/json",
    }
})

export default instance;
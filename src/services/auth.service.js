import axiosInstance from "./api.js";


const login = (loginRequest) => {
    return axiosInstance
        .post(
            "/auth/login",
            loginRequest,
            {withCredentials: true},
        )
        .then((response) => {
            return response.data;
        })
}
const logout = () => {
    return axiosInstance
        .post("/auth/logout")
        .then(response => {
            return response.data;
        })
}

const getCurrentUser = () => {
    return axiosInstance
        .get("/auth/me", { withCredentials: true })
        .then((response) => {
            return response.data;
        })
}


const services = {login, logout, getCurrentUser};
export default services;
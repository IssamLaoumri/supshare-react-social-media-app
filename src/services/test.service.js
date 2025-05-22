import axiosInstance from "./api";

const getPublicContent = () => {
    return axiosInstance.get("/test/all", { withCredentials: true});
};

const getUserBoard = () => {
    return axiosInstance.get("/test/user", { withCredentials: true});
};

const getAdminBoard = () => {
    return axiosInstance.get("/test/admin", { withCredentials: true});
};

const TestService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
}

export default TestService;
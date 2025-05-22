import axiosInstance from "./api.js"

const sendCode = (email) => {
    return axiosInstance
        .post(
            `/code/sendCode`,
            {email: email},
            {withCredentials: true}
        )
        .then((response) => {
            return response.data;
        })

}

const verifyCode = (request) =>{
    return axiosInstance
        .post(
            `/code/verifyCode`,
            request,
            {withCredentials: true}
        )
        .then((response) => {
            return response.data;
        })
}

const services = {sendCode, verifyCode};

export default services;
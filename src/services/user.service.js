import axiosInstance from "./api.js"

const findUser = (email) => {
    return axiosInstance
        .get(
            `/users/find-user?email=${email}`,
            {withCredentials: true}
        )
        .then((response) => {
            return response.data;
        })

}

const changePassword = (values) => {
    return axiosInstance.post(
        "/users/reset-password",
        values,
        {withCredentials: true}
    )
        .then((response) => {
            return response.data;
        })
}

const services = {findUser, changePassword};

export default services;
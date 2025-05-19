import axiosInstance from "./api";
import {logout} from "../slices/auth";

const setup = (store) => {
    const {dispatch} = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/login" && err.response) {
                // Access Token was expired
                if (err.response.data.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        await axiosInstance.post("/auth/refresh-token", null, {withCredentials: true});
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        if (_error.response.data.statusCode === 403) dispatch(logout());
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
}

export default setup;
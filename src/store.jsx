import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/auth.js";
import messageReducer from "./slices/message.js";

const reducer = {
    auth: authReducer,
    message: messageReducer
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
})
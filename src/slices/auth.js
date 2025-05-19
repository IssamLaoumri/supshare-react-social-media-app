import AuthService from "../services/auth.service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message.js";

const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: true, // For initial session check
};

export const login = createAsyncThunk(
    "auth/login",
    async ({email, password}, thunkAPI) => {
        try {
            const res = await AuthService.login({email, password});
            thunkAPI.dispatch(setMessage(res.code))
            return res.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.code) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async ()=> {
        await AuthService.logout();
    }
)

export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, thunkAPI) => {
        try {
            const res = await AuthService.getCurrentUser();
            return res.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.code) ||
                error.error || error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isLoading = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(checkSession.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isLoading = false;
            });
    },
});
const {reducer} = authSlice;
export default reducer;
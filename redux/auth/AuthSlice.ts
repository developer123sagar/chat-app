import axios from "axios";
import toast from "react-hot-toast"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
    loading: boolean;
    loading2: boolean;
    token: string;
    user: {
        _id: string;
        username: string;
        email: string;
        isVerified: boolean;
        role: "USER" | "ADMIN";
        token: string;
    } | null;
}

const storedToken = localStorage.getItem('token') || ""

const initialState: IAuthState = {
    loading: false,
    loading2: false,
    user: null,
    token: storedToken,
}

export const AuthFormSubmit = createAsyncThunk(
    "login/register",
    async ({ form, apiRoute }: { form: any, apiRoute: string }) => {
        try {
            const res = await axios.post(`${apiRoute}`, form)
            const { message, token } = res.data
            toast.success(message)
            return { message, token };
        } catch (err: any) {
            toast.error(err.response.data.error)
            throw new Error(err.response.data.error);
        }
    }
)

export const getUserInfo = createAsyncThunk("user/info",
    async () => {
        try {
            const res = await axios.get("/api/user/userInfo")
            const { data } = res.data
            return { data }
        } catch (err: any) {
            throw new Error(err.response.data.error)
        }
    })

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(AuthFormSubmit.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(AuthFormSubmit.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem("token", state.token);
            }
        })
        builder.addCase(AuthFormSubmit.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading2 = true;
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading2 = false
            state.user = action.payload.data;
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.loading2 = false;
        })
    }
})

export default AuthSlice.reducer;
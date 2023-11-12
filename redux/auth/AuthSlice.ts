import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IAuthState {
    loading: boolean;
    error: string;
    message: string;
    user: {
        _id: string;
        username: string;
        email: string;
        isVerified: boolean;
        role: "USER" | "ADMIN";
        token: string;
    } | null;
}

const initialState: IAuthState = {
    message: "",
    loading: false,
    error: "",
    user: null
}

export const AuthFormSubmit = createAsyncThunk(
    "login/register",
    async ({ form, apiRoute }: { form: any, apiRoute: string }) => {
        try {
            const res = await axios.post(`${apiRoute}`, form)
            const { message } = res.data
            return { message };
        } catch (err: any) {
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
        removeAllData(state) {
            state.error = "";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AuthFormSubmit.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(AuthFormSubmit.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        })
        builder.addCase(AuthFormSubmit.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        })
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.data
        })
        builder.addCase(getUserInfo.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default AuthSlice.reducer;
export const { removeAllData } = AuthSlice.actions
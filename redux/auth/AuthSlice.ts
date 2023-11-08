import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

interface IAuthState {
    loading: boolean;
    error: string;
    message: string
    token: string;
}

const initialState: IAuthState = {
    message: "",
    loading: false,
    error: "",
    token: "",
}

export const AuthFormSubmit = createAsyncThunk(
    "login/register",
    async ({ form, apiRoute }: { form: any, apiRoute: string }) => {
        try {
            const res = await axios.post(`${apiRoute}`, form)
            const { token, message } = res.data
            return { message, token };
        } catch (err: any) {
            throw new Error(err.response.data.error);
        }
    }
)

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
            state.token = action.payload.token
        })
        builder.addCase(AuthFormSubmit.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!;
        })
    }
})

export default AuthSlice.reducer;
export const { removeAllData } = AuthSlice.actions
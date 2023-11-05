import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IAuthState {
    form: any 
    loading: boolean;
    error: string;
    message:string
}

const initialState:IAuthState={
    form:{},
    message:"",
    loading:false,
    error:""
}

export const AuthFormSubmit = createAsyncThunk(
    "login/register",
    async({form,apiRoute}){
        try {
            const res = await axios.post(`${apiRoute}`,form)
            return res.data
            console.log(res)
        } catch (err:any) {
            console.log(err)
            console.log(err.data.response)
            throw new Error(err.message);
            
        }
    }
)

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(AuthFormSubmit.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(AuthFormSubmit.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        builder.addCase(AuthFormSubmit.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default AuthSlice.reducer;
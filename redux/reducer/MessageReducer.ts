import { MessageState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MessageState = {
    messages: []
}

export const MessageReducer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.messages = action.payload
        }
    }
})

export const { setMessage } = MessageReducer.actions
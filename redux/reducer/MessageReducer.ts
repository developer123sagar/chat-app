import { MessageState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MessageState = {
    messages: [],
    isGettingMsg: true,

}

export const MessageReducer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.messages = action.payload
        },
        changeGettingMsg: (state, action) => {
            state.isGettingMsg = action.payload;
        }
    }
})

export const { setMessage, changeGettingMsg } = MessageReducer.actions
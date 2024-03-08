import { MessageState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MessageState = {
    messages: [],
    isGettingMsg: true,
    isMessageSearch: false,
    isCurrentUserProfileView: false,
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
        },
        addMessage: (state, action) => {
            state.messages = Array.isArray(state.messages) ? [...state.messages, action.payload] : [action.payload];
        },
        setMessageSearch: (state, action) => {
            state.isMessageSearch = action.payload
        },
        setCurrentUserProfileView: (state, action) => {
            state.isCurrentUserProfileView = action.payload
        }
    }
})

export const { setMessage, changeGettingMsg, addMessage, setMessageSearch, setCurrentUserProfileView } = MessageReducer.actions
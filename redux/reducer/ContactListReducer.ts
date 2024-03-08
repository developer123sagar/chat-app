import { ContactListState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ContactListState = {
    loading: false,
    contactList: null,
    userInfo: null,
    isNewUser: false,
    isContactsPage: false,
    currentChatUser: null,
    skipUserInfo: false,
    loginUser: null,
    onlineUsers: null,
};


export const contactListReducer = createSlice({
    name: "contactList",
    initialState,
    reducers: {
        setContactPage: (state) => {
            state.isContactsPage = !state.isContactsPage;
        },
        changeCurrentUser: (state, action) => {
            state.currentChatUser = action.payload;
            state.isContactsPage = false;
        },
        changeSkipUserInfo: (state, action) => {
            state.skipUserInfo = action.payload
        },
        setUser: (state, action) => {
            console.log(action.payload)
            state.loginUser = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    },
});


export const { setContactPage, changeCurrentUser, changeSkipUserInfo, setUser, setOnlineUsers } = contactListReducer.actions;

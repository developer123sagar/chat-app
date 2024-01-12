import { ContactListStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ContactListStateProps = {
    loading: false,
    contactList: null,
    userInfo: null,
    isNewUser: false,
    isContactsPage: false,
    currentChatUser: null,
    skipUserInfo: false,
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
        }
    },
});


export const { setContactPage, changeCurrentUser, changeSkipUserInfo } = contactListReducer.actions;

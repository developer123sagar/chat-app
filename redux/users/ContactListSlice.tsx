import { ContactListStateProps } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: ContactListStateProps = {
  loading: false,
  contactList: null,
  userInfo: null,
  isNewUser: false,
  isContactsPage: false,
  currentChatUser: null,
};

export const getUserContactList = createAsyncThunk("contactlist", async () => {
  try {
    const res = await axios.get("/api/user/all");
    const { data } = res.data;
    return data;
  } catch (err: any) {
    toast.error(err.response.data.message);
    throw new Error(err.response.data.error);
  }
});

const ContactListSlice = createSlice({
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
  },
  extraReducers: (builder) => {
    builder.addCase(getUserContactList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserContactList.fulfilled, (state, action) => {
      state.loading = false;
      state.contactList = action.payload;
    });
    builder.addCase(getUserContactList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default ContactListSlice.reducer;
export const { setContactPage, changeCurrentUser } = ContactListSlice.actions;

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import AuthReducer from '@/redux/auth/AuthSlice';
import ContactListReducer from "@/redux/users/ContactListSlice"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        contactList: ContactListReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
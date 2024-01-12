import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { contactListAPI } from './api/ContactListApi';
import { authAPI } from './api/AuthApi';
import { contactListReducer } from './reducer/ContactListReducer';
import { messageAPI } from './api/MessageApi';
import { MessageReducer } from './reducer/MessageReducer';

const store = configureStore({
    reducer: {
        [contactListAPI.reducerPath]: contactListAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [messageAPI.reducerPath]: messageAPI.reducer,
        [contactListReducer.name]: contactListReducer.reducer,
        [MessageReducer.name]: MessageReducer.reducer,
    },
    middleware: (mid) => [...mid(), contactListAPI.middleware, authAPI.middleware, messageAPI.middleware]
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
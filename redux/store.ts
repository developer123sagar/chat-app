import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authAPI } from './api/AuthApi';
import { contactListAPI } from './api/ContactListApi';
import { messageAPI } from './api/MessageApi';
import { predictMsgAPI } from './api/PredictMsgAPI';
import { contactListReducer } from './reducer/ContactListReducer';
import { MessageReducer } from './reducer/MessageReducer';

const store = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        [contactListAPI.reducerPath]: contactListAPI.reducer,
        [messageAPI.reducerPath]: messageAPI.reducer,
        [predictMsgAPI.reducerPath]: predictMsgAPI.reducer,
        [contactListReducer.name]: contactListReducer.reducer,
        [MessageReducer.name]: MessageReducer.reducer,
    },
    middleware: (mid) => [...mid(), contactListAPI.middleware, authAPI.middleware, messageAPI.middleware, predictMsgAPI.middleware]
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
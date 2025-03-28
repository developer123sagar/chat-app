import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_USER_INFO, SEND_FORGOT_PASS_MAIL, USER_LOG_OUT } from "@/constants";
import { ContactListUser } from "@/types";

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_LOCALHOST_URL,
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getUserInfo: builder.query<ContactListUser, any>({
            query: () => GET_USER_INFO,
            transformResponse: (res: any) => res.data,
            providesTags: ["user"]
        }),
        authFormSubmit: builder.mutation<ContactListUser, any>({
            query: ({ form, api }) => ({
                url: api,
                method: "POST",
                body: form,
            }),
            transformErrorResponse: (err) => err.data,
        }),
        sendForgotPassMail: builder.mutation<any, string>({
            query: (email) => ({
                url: SEND_FORGOT_PASS_MAIL,
                method: "POST",
                body: { email: email }
            }),
            transformErrorResponse: (err) => err.data

        }),
        resetPassword: builder.mutation<any, any>({
            query: (form) => ({
                url: "/api/user/forgotpassword/reset-password",
                method: "POST",
                body: form
            }),
            transformErrorResponse: (err) => err.data
        }),
        logOut: builder.query<any, any>({
            query: () => USER_LOG_OUT,
        })
    }),
});


export const { useGetUserInfoQuery, useAuthFormSubmitMutation, useLogOutQuery, useSendForgotPassMailMutation, useResetPasswordMutation } = authAPI;

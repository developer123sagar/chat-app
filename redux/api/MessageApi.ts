import { GET_MESSAGE, SEND_IMAGE, SEND_MESSAGE } from "@/constants";
import { MessageType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// DOMAIN_LOCALHOST_URL

export const messageAPI = createApi({
    reducerPath: "messageAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_URL,
    }),
    tagTypes: ["message"],
    endpoints: (builder) => ({
        getMessages: builder.query<MessageType[], any>({
            query: (to) => ({ url: `${GET_MESSAGE}/${to}` }),
            transformResponse: (res: any) => res.data,
            transformErrorResponse: (err: any) => err.data,
        }),
        sendMessage: builder.mutation<MessageType, any>({
            query: (form) => ({
                url: SEND_MESSAGE,
                method: "POST",
                body: form
            }),
            transformErrorResponse: (err) => err.data,
        }),
        sendImage: builder.mutation<MessageType, any>({
            query: (formData) => ({
                url: SEND_IMAGE,
                method: "POST",
                body: formData,
            }),
            transformResponse: (res: any) => res.message
        })
    })
})

export const { useGetMessagesQuery, useSendMessageMutation, useSendImageMutation } = messageAPI
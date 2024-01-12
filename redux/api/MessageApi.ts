import { GET_MESSAGE, SEND_MESSAGE } from "@/constants/APIRoute";
import { MessageType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageAPI = createApi({
    reducerPath: "messageAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_LOCALHOST_URL,
    }),
    endpoints: (builder) => ({
        getMessages: builder.query<MessageType[], any>({
            query: (to) => ({ url: `${GET_MESSAGE}/${to}` }),
            transformResponse: (res: any) => res.data,
            transformErrorResponse: (err: any) => err.data
        }),
        sendMessage: builder.mutation<MessageType, any>({
            query: (form) => ({
                url: SEND_MESSAGE,
                method: "POST",
                body: form
            }),
            transformErrorResponse: (err) => err.data,
        })
    })
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageAPI
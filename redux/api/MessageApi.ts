import { GET_MESSAGE, SEND_MESSAGE } from "@/constants";
import { MessageType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageAPI = createApi({
    reducerPath: "messageAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_LOCALHOST_URL,
    }),
    tagTypes: ["message"],
    endpoints: (builder) => ({
        getMessages: builder.query<MessageType[], any>({
            query: (to) => ({ url: `${GET_MESSAGE}/${to}` }),
            transformResponse: (res: any) => res.data,
            transformErrorResponse: (err: any) => err.data,
            providesTags: ["message"]
        }),
        sendMessage: builder.mutation<MessageType, any>({
            query: (form) => ({
                url: SEND_MESSAGE,
                method: "POST",
                body: form
            }),
            transformErrorResponse: (err) => err.data,
            invalidatesTags: ["message"]
        })
    })
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageAPI
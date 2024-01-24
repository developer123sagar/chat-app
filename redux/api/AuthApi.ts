import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GET_USER_INFO } from "@/constants";
import { ContactListUser } from "@/types";

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_URL,
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
    }),
});


export const { useGetUserInfoQuery, useAuthFormSubmitMutation } = authAPI;

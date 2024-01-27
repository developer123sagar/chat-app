import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { GET_CONTACT_LIST } from "@/constants";
import { ContactList } from "@/types";

export const contactListAPI = createApi({
    reducerPath: "contactListAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_LOCALHOST_URL,
    }),
    endpoints: (builder) => ({
        getContactList: builder.query<ContactList, void>({
            query: () => GET_CONTACT_LIST,
            transformResponse: (res: any) => res.data,
            transformErrorResponse: (err: any) => err.data
        }),
    }),
});

export const { useGetContactListQuery } = contactListAPI;

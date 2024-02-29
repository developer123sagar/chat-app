import { UPDATE_PROFILE } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileUpdateApi = createApi({
    reducerPath: "profileUpdateApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.DOMAIN_LOCALHOST_URL,
    }),
    endpoints: (builder) => ({
        updateProfile: builder.mutation<any, any>({
            query: (formData) => ({
                url: UPDATE_PROFILE,
                method: "POST",
                body: formData
            })
        })
    })
})


export const { useUpdateProfileMutation } = profileUpdateApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PREDICT_MSG } from "@/constants";
import { PredictMsg } from "@/types";

export const predictMsgAPI = createApi({
    reducerPath: "predictMsg",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000",
    }),
    endpoints: (builder) => ({
        predictMSG: builder.mutation<PredictMsg, string>({
            query: (msg: string) => ({
                url: PREDICT_MSG,
                method: "POST",
                body: { text: msg },
            }),
            transformResponse: (res: any) => res
        })
    })
})

export const { usePredictMSGMutation } = predictMsgAPI
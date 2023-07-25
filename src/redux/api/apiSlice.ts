import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-api-kappa.vercel.app/api/v1",
  }),

  tagTypes: ["review"],

  endpoints: () => ({}),
});

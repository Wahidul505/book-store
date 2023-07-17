import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-store-server-q5rr.vercel.app/api/v1",
  }),
  tagTypes: ["reviews", "books", "wishList", "readingStatusList"],
  endpoints: () => ({}),
});

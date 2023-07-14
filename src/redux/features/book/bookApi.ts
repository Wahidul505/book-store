import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getLatestBooks: builder.query({
      query: () => "/books/latest-books",
    }),
  }),
});

export const { useGetBooksQuery, useGetLatestBooksQuery } = bookApi;

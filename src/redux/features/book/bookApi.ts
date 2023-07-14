import { IBook } from "../../../types/book";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getLatestBooks: builder.query({
      query: () => "/books/latest-books",
    }),
    addNewBook: builder.mutation({
      query: (bookData: IBook) => ({
        url: "/books/add-book",
        method: "POST",
        body: bookData,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetLatestBooksQuery,
  useAddNewBookMutation,
} = bookApi;

import { IBook } from "../../../types/book";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    getLatestBooks: builder.query({
      query: () => "/books/latest-books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id as string | number}`,
      providesTags: ["reviews"],
    }),
    addNewBook: builder.mutation({
      query: (bookData: Partial<IBook>) => ({
        url: "/books/add-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    postReview: builder.mutation({
      query: ({ id, reviewData }: { id: string; reviewData: string }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: { review: reviewData },
      }),
      invalidatesTags: ["reviews"],
    }),
    editBook: builder.mutation({
      query: ({
        id,
        user,
        bookData,
      }: {
        id: string;
        user: string;
        bookData: Partial<IBook>;
      }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: bookData,
        headers: { authorization: user },
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id, user }: { id: string; user: string }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: { authorization: user },
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetLatestBooksQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  usePostReviewMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;

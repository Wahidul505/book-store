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
    }),
    postReview: builder.mutation({
      query: ({ id, reviewData }: { id: string; reviewData: string }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: { review: reviewData },
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetLatestBooksQuery,
  useGetSingleBookQuery,
  useAddNewBookMutation,
  usePostReviewMutation,
} = bookApi;

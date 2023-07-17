import { api } from "../../api/apiSlice";

const wishListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: (user: string) => ({
        url: "/wish-list",
        method: "GET",
        headers: { authorization: user },
      }),
      providesTags: ["wishList"],
    }),
    addToWishList: builder.mutation({
      query: ({ id, user }: { id: string; user: string }) => ({
        url: `/wish-list/${id}`,
        method: "POST",
        headers: { authorization: user },
      }),
      invalidatesTags: ["wishList"],
    }),
  }),
});

export const { useGetWishListQuery, useAddToWishListMutation } = wishListApi;

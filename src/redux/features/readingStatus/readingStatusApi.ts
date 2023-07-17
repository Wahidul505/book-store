import { api } from "../../api/apiSlice";

const readingStatusApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReadingStatus: builder.query({
      query: (user: string) => ({
        url: "/reading-status",
        method: "GET",
        headers: { authorization: user },
      }),
      providesTags: ["readingStatusList"],
    }),
    changeReadingStatus: builder.mutation({
      query: ({
        id,
        user,
        status,
      }: {
        id: string;
        user: string;
        status: string;
      }) => ({
        url: `/reading-status?id=${id}&status=${status}`,
        method: "PATCH",
        headers: { authorization: user },
      }),
      invalidatesTags: ["readingStatusList"],
    }),
  }),
});

export const { useGetReadingStatusQuery, useChangeReadingStatusMutation } =
  readingStatusApi;

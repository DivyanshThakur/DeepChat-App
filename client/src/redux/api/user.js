import { rootApi } from ".";

export const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "users",
      keepUnusedDataFor: 5,
      transformResponse: ({ data }) => data,
    }),
    // accessChats: build.mutation({
    //   query: (body) => ({
    //     url: "chats",
    //     method: "POST",
    //     body,
    //   }),
    //   transformResponse: (response) => response.data,
    // }),
  }),
});

export const { useGetUsersQuery } = userApi;

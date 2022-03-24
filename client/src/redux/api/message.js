import { rootApi } from ".";

export const messageApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => "messages",
      providesTags: ["CHATS"],
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    sendMessage: build.mutation({
      query: (body) => ({
        url: "messages",
        method: "POST",
        "Content-Type": "multipart/form-data",
        body,
      }),
      invalidatesTags: ["CHATS"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useSendMessageMutation } = messageApi;

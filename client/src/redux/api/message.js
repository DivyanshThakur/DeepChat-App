import { rootApi } from ".";

export const messageApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: (chatId) => `messages/${chatId}`,
      providesTags: ["CHATS"],
      transformResponse: ({ data }) => data,
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

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;

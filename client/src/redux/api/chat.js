import { rootApi } from ".";

export const chatApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getChats: build.query({
      query: () => "chats",
      providesTags: ["CHATS"],
      transformResponse: ({ data }) => {
        return data.chats.map((chat) => {
          if (chat.isGroupChat) {
            return chat;
          }

          const sender = chat.users.find((user) => user._id !== data.user._id);

          return {
            ...chat,
            name: sender.name,
            avatar: sender.avatar,
          };
        });
      },
    }),
    accessChats: build.mutation({
      query: (body) => ({
        url: "chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CHATS"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetChatsQuery, useAccessChatsMutation } = chatApi;

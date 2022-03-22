// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

// initialize an empty api service that we'll inject endpoints into later as needed
// rootApi - Empty History Diaries Api
export const rootApi = createApi({
  refetchOnReconnect: true,
  reducerPath: "rootApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

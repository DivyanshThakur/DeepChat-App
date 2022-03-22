import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getUserAuth,
  removeUserAuth,
  saveUserAuth,
} from "../../utils/userAuth";

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SERVER_URL_DEV
    : process.env.REACT_APP_SERVER_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api`,
  keepUnusedDataFor: 5,
  credentials: "include", // Required to use cookies
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const { accessToken } = getUserAuth();

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // try to get a new token
    const { data: refreshResult } = await baseQuery(
      { url: "auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult) {
      // store the new token
      saveUserAuth(refreshResult.data);

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      const { url } = args;

      if (
        url !== "auth/login" &&
        url !== "auth/forgot-password" &&
        url !== "auth/reset-password" &&
        url !== "auth/validate-otp"
      ) {
        window.location.reload();
      }

      removeUserAuth();
    }
  }

  return result;
};

import { rootApi } from ".";

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    register: build.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    updatePassword: build.mutation({
      query: (body) => ({
        url: "auth/update-password",
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
    }),
    validateOtp: build.mutation({
      query: (data) => {
        const { resetToken, ...body } = data;

        return {
          url: `auth/validate-otp/${resetToken}`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: build.mutation({
      query: (data) => {
        const { resetToken, ...body } = data;

        return {
          url: `auth/reset-password/${resetToken}`,
          method: "PUT",
          body,
        };
      },
      transformResponse: (response) => response.data,
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
      transformResponse: (response) => response.data,
    }),
    revokeRefreshTokens: build.mutation({
      query: () => ({
        url: "auth/revoke-refresh-tokens",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useValidateOtpMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useRevokeRefreshTokensMutation,
} = authApi;

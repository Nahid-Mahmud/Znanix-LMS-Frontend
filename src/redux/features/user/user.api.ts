import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/response.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<TResponse<unknown>, Partial<unknown>>({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        data: data,
      }),
    }),

    userInfo: builder.query<TResponse<unknown>, void>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllUsers: builder.query<TResponse<unknown[]>, Record<string, string>>({
      query: (params) => ({
        url: "/user/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    changePin: builder.mutation<TResponse<null>, { oldPin: string; newPin: string }>({
      query: (data) => ({
        url: "/user/change-pin",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    setPin: builder.mutation<TResponse<null>, { pin: string }>({
      query: (data) => ({
        url: "/user/set-pin",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUserInfoQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useChangePinMutation,
  useSetPinMutation,
} = userApi;

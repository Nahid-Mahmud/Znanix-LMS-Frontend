import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/stats/dashboard",
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    getOverallStats: builder.query({
      query: () => ({
        url: "/stats/overview",
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    getUserStats: builder.query({
      query: (params) => ({
        url: "/stats/users",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getCourseStats: builder.query({
      query: (params) => ({
        url: "/stats/courses",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getEnrollmentStats: builder.query({
      query: (params) => ({
        url: "/stats/enrollments",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getRevenueStats: builder.query({
      query: (params) => ({
        url: "/stats/revenue",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),

    getInstructorStats: builder.query({
      query: (params) => ({
        url: "/stats/instructors",
        method: "GET",
        params,
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetOverallStatsQuery,
  useGetUserStatsQuery,
  useGetCourseStatsQuery,
  useGetEnrollmentStatsQuery,
  useGetRevenueStatsQuery,
  useGetInstructorStatsQuery,
} = statsApi;

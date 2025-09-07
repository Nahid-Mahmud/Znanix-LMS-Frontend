import { baseApi } from "@/redux/baseApi";

export const userCoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Course purchase/enrollment
    purchaseCourse: builder.mutation({
      query: (courseId) => ({
        url: `/user-courses/purchase/${courseId}`,
        method: "POST",
        // data: data,
      }),
      invalidatesTags: ["UserCourse", "Course"],
    }),

    // Get user's enrolled courses
    getUserCourses: builder.query({
      query: (params) => ({
        url: "/user-courses/my-courses",
        method: "GET",
        params,
      }),
      providesTags: ["UserCourse"],
    }),

    // Get single enrollment details
    getSingleUserCourse: builder.query({
      query: (enrollmentId) => ({
        url: `/user-courses/enrollment/${enrollmentId}`,
        method: "GET",
      }),
      providesTags: ["UserCourse"],
    }),

    // Update course progress
    updateCourseProgress: builder.mutation({
      query: ({ enrollmentId, data }) => ({
        url: `/user-courses/enrollment/${enrollmentId}/progress`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["UserCourse", "Course"],
    }),

    // Admin route - get all enrollments
    getAllUserCourses: builder.query({
      query: (params) => ({
        url: "/user-courses/all",
        method: "GET",
        params,
      }),
      providesTags: ["UserCourse"],
    }),

    // Legacy route for backward compatibility
    createUserCourses: builder.mutation({
      query: (data) => ({
        url: "/user-courses",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["UserCourse"],
    }),

    myCourseStats: builder.query({
      query: () => ({
        url: "/user-courses/my-courses-stats",
        method: "GET",
      }),
      providesTags: ["UserCourse"],
    }),
  }),
});

export const {
  usePurchaseCourseMutation,
  useGetUserCoursesQuery,
  useGetSingleUserCourseQuery,
  useUpdateCourseProgressMutation,
  useGetAllUserCoursesQuery,
  useCreateUserCoursesMutation,
  useMyCourseStatsQuery,
} = userCoursesApi;

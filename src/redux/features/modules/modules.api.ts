import { baseApi } from "@/redux/baseApi";

export const courseModuleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourseModule: builder.mutation({
      query: (data) => ({
        url: "/course-modules/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["CourseModule", "Course"],
    }),

    getCourseModules: builder.query({
      query: (params) => ({
        url: "/course-modules",
        method: "GET",
        params,
      }),
      providesTags: ["CourseModule", "Course"],
    }),

    getMyCourseModules: builder.query({
      query: (params) => ({
        url: "/course-modules/my-modules",
        method: "GET",
        params,
      }),
      providesTags: ["CourseModule", "Course"],
    }),

    getCourseModulesByCourseId: builder.query({
      query: (courseId) => ({
        url: `/course-modules/by-course/${courseId}`,
        method: "GET",
      }),
      providesTags: ["CourseModule", "Course"],
    }),

    getCourseModuleById: builder.query({
      query: (id) => ({
        url: `/course-modules/${id}`,
        method: "GET",
      }),
      providesTags: ["CourseModule", "Course"],
    }),

    updateCourseModule: builder.mutation({
      query: ({ data, id }) => ({
        url: `/course-modules/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["CourseModule", "Course"],
    }),

    deleteCourseModule: builder.mutation({
      query: (id) => ({
        url: `/course-modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseModule", "Course"],
    }),
  }),
});

export const {
  useCreateCourseModuleMutation,
  useGetCourseModulesQuery,
  useGetMyCourseModulesQuery,
  useGetCourseModulesByCourseIdQuery,
  useGetCourseModuleByIdQuery,
  useUpdateCourseModuleMutation,
  useDeleteCourseModuleMutation,
} = courseModuleApi;

import { baseApi } from "@/redux/baseApi";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Course"],
    }),

    myCourses: builder.query({
      query: () => ({
        url: "/courses/me",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getAllCourses: builder.query({
      query: (params) => ({
        url: "/courses/all",
        method: "GET",
        params,
      }),
      providesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useMyCoursesQuery,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} = coursesApi;

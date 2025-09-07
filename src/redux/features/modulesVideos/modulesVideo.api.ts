import { baseApi } from "@/redux/baseApi";

export const moduleVideosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createModuleVideo: builder.mutation({
      query: (data) => ({
        url: "/module-videos",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),

    getAllModuleVideos: builder.query({
      query: (params) => ({
        url: "/module-videos",
        method: "GET",
        params,
      }),
      providesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),

    getVideosByModuleId: builder.query({
      query: (moduleId) => ({
        url: `/module-videos/module/${moduleId}`,
        method: "GET",
      }),
      providesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),

    getModuleVideoById: builder.query({
      query: (videoId) => ({
        url: `/module-videos/${videoId}`,
        method: "GET",
      }),
      providesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),

    updateModuleVideo: builder.mutation({
      query: ({ data, videoId }) => ({
        url: `/module-videos/${videoId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),

    deleteModuleVideo: builder.mutation({
      query: (videoId) => ({
        url: `/module-videos/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course", "CourseModule", "ModuleVideo"],
    }),
  }),
});

export const {
  useCreateModuleVideoMutation,
  useGetAllModuleVideosQuery,
  useGetVideosByModuleIdQuery,
  useGetModuleVideoByIdQuery,
  useUpdateModuleVideoMutation,
  useDeleteModuleVideoMutation,
} = moduleVideosApi;

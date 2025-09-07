import { baseApi } from "@/redux/baseApi";

export const moduleVideosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createModuleVideo: builder.mutation({
      query: (data) => ({
        url: "/module-videos",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["ModuleVideo"],
    }),

    getAllModuleVideos: builder.query({
      query: (params) => ({
        url: "/module-videos",
        method: "GET",
        params,
      }),
      providesTags: ["ModuleVideo"],
    }),

    getVideosByModuleId: builder.query({
      query: (moduleId) => ({
        url: `/module-videos/module/${moduleId}`,
        method: "GET",
      }),
      providesTags: ["ModuleVideo"],
    }),

    getModuleVideoById: builder.query({
      query: (videoId) => ({
        url: `/module-videos/${videoId}`,
        method: "GET",
      }),
      providesTags: ["ModuleVideo"],
    }),

    updateModuleVideo: builder.mutation({
      query: ({ data, videoId }) => ({
        url: `/module-videos/${videoId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["ModuleVideo"],
    }),

    deleteModuleVideo: builder.mutation({
      query: (videoId) => ({
        url: `/module-videos/${videoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ModuleVideo"],
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

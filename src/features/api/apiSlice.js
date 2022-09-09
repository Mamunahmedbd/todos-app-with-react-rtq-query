import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mamun-json-server.herokuapp.com/",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ colors = "", status = "" }) => {
        let qStrng = "";
        if (colors?.length > 0) {
          qStrng += colors?.map((color) => `color_like=${color}`).join("&");
        }
        if (status?.length > 0) {
          qStrng += `completed_like=${status}`;
        }
        return {
          url: `todos?${qStrng}`,
        };
      },
      providesTags: ["Todos"],
    }),
    addTodos: builder.mutation({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    allComplete: builder.mutation({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteAllTodos: builder.mutation({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    statusChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    colorChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateText: builder.mutation({
      query: ({ id, data }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useAllCompleteMutation,
  useDeleteAllTodosMutation,
  useDeleteTodoMutation,
  useStatusChangeMutation,
  useColorChangeMutation,
  useUpdateTextMutation,
} = todosApi;

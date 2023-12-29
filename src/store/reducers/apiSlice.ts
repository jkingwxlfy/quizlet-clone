import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBoard } from "../../models/IBoard";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes: ["Board"],
    endpoints: (builder) => ({
        getBoards: builder.query<IBoard[], unknown>({
            query: () => ({
                url: "/boards",
            }),
            providesTags: (result) => ["Board"],
        }),
        createBoard: builder.mutation<IBoard, IBoard>({
            query: (board: IBoard) => ({
                url: "/boards",
                method: "POST",
                body: board,
            }),
            invalidatesTags: ["Board"],
        }),
        editBoard: builder.mutation<IBoard, IBoard>({
            query: (board: IBoard) => ({
                url: `/boards/${board.id}`,
                method: "PUT",
                body: board,
            }),
            invalidatesTags: ["Board"],
        }),
        deleteBoard: builder.mutation<IBoard, IBoard>({
            query: (board: IBoard) => ({
                url: `/boards/${board.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Board"],
        }),
    }),
});

export const {
    useGetBoardsQuery,
    useCreateBoardMutation,
    useEditBoardMutation,
    useDeleteBoardMutation,
} = apiSlice;

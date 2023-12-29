import { IBoard } from "../models/IBoard";
import { useGetBoardsQuery } from "../store/reducers/apiSlice";
import { useAppDispatch } from "./redux";
import { setAllBoards } from "../store/reducers/boardsSlice";
import { useEffect } from "react";

const useBoards = () => {
    const {
        data: fetchedBoards = [] as IBoard[],
        isError,
        isLoading,
    } = useGetBoardsQuery("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isError && !isLoading) {
            dispatch(setAllBoards(fetchedBoards));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedBoards]);

    return { fetchedBoards, isError, isLoading };
};

export default useBoards;

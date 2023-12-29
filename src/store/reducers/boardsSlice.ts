import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBoard } from "../../models/IBoard";

interface SliceState {
    boards: IBoard[];
}

const initialState: SliceState = {
    boards: [],
};

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        setAllBoards: (state, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload;
        },
        createOneBoard: (state, action: PayloadAction<IBoard>) => {
            state.boards = [...state.boards, action.payload];
        },
        changeBoardName: (state, action: PayloadAction<IBoard>) => {
            state.boards.map((itemBoard: IBoard) => {
                if (itemBoard.id === action.payload.id) {
                    return (itemBoard.title = action.payload.title);
                }
                return itemBoard;
            });
        },
        deleteOneBoard: (state, action: PayloadAction<string>) => {
            state.boards.filter((itemBoard: IBoard) => {
                return itemBoard.id !== action.payload;
            });
        },
        createOneCard: (state, action: PayloadAction<IBoard>) => {
            state.boards.map((itemBoard: IBoard) => {
                if (itemBoard.id === action.payload.id) {
                    return (itemBoard.cards = action.payload.cards);
                }
                return itemBoard;
            });
        },
        setNewBoard: (state, action: PayloadAction<IBoard>) => {
            state.boards.map((itemBoard: IBoard) => {
                if (itemBoard.id === action.payload.id) {
                    return { ...action.payload };
                }
                return itemBoard;
            });
        },
    },
});

const { actions, reducer } = boardsSlice;
export const {
    setAllBoards,
    createOneBoard,
    changeBoardName,
    deleteOneBoard,
    createOneCard,
    setNewBoard,
} = actions;
export default reducer;

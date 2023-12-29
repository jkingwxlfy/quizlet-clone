import { createSlice } from "@reduxjs/toolkit";
import type { IBoard, ICard } from "../../models/IBoard";

const initialState = {
    board: {} as IBoard,
    card: {} as ICard,
};

interface PayloadActionBoards<Boards, ID> {
    payload: {
        boards: Boards;
        id: ID;
    };
}

interface ID {
    boardId: string;
    cardId: string;
}

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        setCardSliceData: (
            state,
            action: PayloadActionBoards<IBoard[], ID>
        ) => {
            state.board = action.payload.boards.filter((boardItem) => {
                return boardItem.id === action.payload.id.boardId;
            })[0];
            state.card = state.board.cards.filter((cardItem: ICard) => {
                return cardItem.id === action.payload.id.cardId;
            })[0];
        },
    },
});

const { actions, reducer } = cardSlice;
export const { setCardSliceData } = actions;
export default reducer;

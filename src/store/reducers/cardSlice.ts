import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, ICard, IWord } from "../../models/IBoard";

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

const initialState = {
    board: {} as IBoard,
    card: {} as ICard,
    filteredWords: [] as IWord[],
};

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
        editCardData: (state, action: PayloadAction<ICard>) => {
            state.card = { ...action.payload };
        },
        filterWords: (state, action: PayloadAction<string>) => {
            if (action.payload === "") {
                state.filteredWords = state.card &&
                    state.card.words && [...state.card.words];
                return;
            }
            state.filteredWords =
                state.card.words &&
                state.card.words.filter((word) => {
                    return (
                        word.value
                            .toLowerCase()
                            .includes(action.payload.toLowerCase()) ||
                        word.word
                            .toLowerCase()
                            .includes(action.payload.toLowerCase())
                    );
                });
        },
    },
});

const { actions, reducer } = cardSlice;
export const { setCardSliceData, filterWords, editCardData } = actions;
export default reducer;

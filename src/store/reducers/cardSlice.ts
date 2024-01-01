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

interface sliceState {
    board: IBoard;
    card: ICard;
    filteredWords: IWord[];
    searchQuery: string;
}

const initialState: sliceState = {
    board: {
        id: "",
        title: "",
        cards: [] as ICard[],
    },
    card: {
        id: "",
        title: "",
        completed: false,
        words: [] as IWord[],
    },
    filteredWords: [],
    searchQuery: "",
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
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        filterWords: (state) => {
            state.filteredWords =
                state.card &&
                [...state.card.words].filter((word) => {
                    return (
                        word.value
                            .toLowerCase()
                            .includes(state.searchQuery.toLowerCase()) ||
                        word.word
                            .toLowerCase()
                            .includes(state.searchQuery.toLowerCase())
                    );
                });
        },
    },
});

const { actions, reducer } = cardSlice;
export const { setCardSliceData, filterWords, editCardData, setSearchQuery } =
    actions;
export default reducer;

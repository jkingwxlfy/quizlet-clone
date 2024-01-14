import { createSlice } from "@reduxjs/toolkit";
import shuffle from "../../utils/shuffleArray";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, ICard, IWord } from "../../models/IBoard";
import type { ITestWord } from "../../models/ITestWord";

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
    testWords: ITestWord[];
    isShowedResult: boolean;
    filledAnswersCount: number;
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
        onlyStars: false,
        words: [] as IWord[],
    },
    filteredWords: [],
    searchQuery: "",
    testWords: [] as ITestWord[],
    isShowedResult: false,
    filledAnswersCount: 0,
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
            state.card.onlyStars = localStorage.getItem("onlyStars") === "true";
            state.filteredWords = [...state.card.words].filter((word) => {
                if (state.card.onlyStars) {
                    return (
                        (word.starred &&
                            word.value
                                .toLowerCase()
                                .includes(state.searchQuery.toLowerCase())) ||
                        (word.starred &&
                            word.word
                                .toLowerCase()
                                .includes(state.searchQuery.toLowerCase()))
                    );
                }
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
        setTestWords: (state, action: PayloadAction<ITestWord[]>) => {
            state.testWords = action.payload;
        },
        setFilledAnswerCount: (state, action: PayloadAction<number>) => {
            state.filledAnswersCount = action.payload;
        },
        setIsShowedResults: (state, action: PayloadAction<boolean>) => {
            state.isShowedResult = action.payload;
        },
        shuffleFilteredWords: (state) => {
            state.filteredWords = shuffle(state.filteredWords);
        },
        resetAndShuffleTestWords: (state) => {
            state.testWords = shuffle(state.filteredWords).map((words) => {
                return { ...words, answer: "", input: "", isCorrect: null };
            });
        },
    },
});

const { actions, reducer } = cardSlice;
export const {
    setCardSliceData,
    filterWords,
    editCardData,
    setSearchQuery,
    setTestWords,
    setFilledAnswerCount,
    setIsShowedResults,
    shuffleFilteredWords,
    resetAndShuffleTestWords,
} = actions;
export default reducer;

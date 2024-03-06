import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./reducers/apiSlice";
import boardsSlice from "./reducers/boardsSlice";
import cardSlice from "./reducers/cardSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        boardsSlice,
        cardSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

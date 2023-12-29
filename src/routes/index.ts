import {
    BoardPage,
    HomePage,
    CardPage,
    CardModePage,
    TestModePage,
} from "../pages";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    NOTFOUND = "*",
    HOME = "/",
    BOARD = "/boards/:id",
    CARD = "/boards/:boardId/:cardId",
    CARD_MODE = "/boards/:boardId/:cardId/card",
    TEST_MODE = "/boards/:boardId/:cardId/test",
}

export const routes: IRoute[] = [
    { path: RouteNames.NOTFOUND, component: HomePage },
    { path: RouteNames.HOME, component: HomePage },
    { path: RouteNames.BOARD, component: BoardPage },
];

export const cardRoutes: IRoute[] = [
    { path: RouteNames.CARD, component: CardPage },
    { path: RouteNames.CARD_MODE, component: CardModePage },
    { path: RouteNames.TEST_MODE, component: TestModePage },
];

export interface IWord {
    id: string;
    word: string;
    value: string;
}

export interface ICard {
    id: string;
    title: string;
    completed: boolean;
    words: IWord[];
}

export interface IBoard {
    id: string;
    title: string;
    cards: ICard[];
}

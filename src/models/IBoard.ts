export interface IWord {
    id: string;
    word: string;
    value: string;
    starred: boolean;
}

export interface ICard {
    id: string;
    title: string;
    completed: boolean;
    onlyStars: boolean;
    words: IWord[];
}

export interface IBoard {
    id: string;
    title: string;
    cards: ICard[];
}

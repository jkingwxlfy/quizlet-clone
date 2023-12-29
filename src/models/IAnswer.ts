import { IWord } from "./IBoard";

export interface IAnswer extends IWord {
    input: string;
    answer: string;
    isCorrect?: boolean;
}

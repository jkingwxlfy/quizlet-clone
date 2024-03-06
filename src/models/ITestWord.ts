import type { IWord } from './IBoard';

export interface ITestWord extends IWord {
    input: string;
    answer: string;
    isCorrect?: boolean | null;
}

import { ChangeEvent } from "react";
import { ITestWord } from "../../models/ITestWord";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    setTestWords,
    setFilledAnswerCount,
} from "../../store/reducers/cardSlice";
import { Star } from "../UI";

interface TestPageListItemProps {
    word: ITestWord;
    index: number;
    inputRefs: React.RefObject<HTMLInputElement[]>;
}

const TestPageListItem: React.FC<TestPageListItemProps> = ({
    word,
    index,
    inputRefs,
}) => {
    const dispatch = useAppDispatch();
    const { testWords, filledAnswersCount, isShowedResult } = useAppSelector(
        (state) => state.cardSlice
    );

    const onSetInput = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const newTestWords = testWords.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    input: event.target.value,
                };
            }
            return item;
        });
        dispatch(setTestWords(newTestWords));
    };

    const onInputBlur = (word: ITestWord) => {
        const newTestWords = testWords.map((item) => {
            if (item.id === word.id) {
                if (word.input !== item.answer) {
                    if (item.answer === "") {
                        dispatch(setFilledAnswerCount(filledAnswersCount + 1));
                    } else if (word.input === "" && item.answer) {
                        dispatch(setFilledAnswerCount(filledAnswersCount - 1));
                    }
                    return { ...item, answer: word.input };
                }
            }
            return item;
        });
        dispatch(setTestWords(newTestWords));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (inputRefs.current && inputRefs.current.length > 0) {
            if (event.key === "ArrowUp" && index > 0) {
                const prevInput = inputRefs.current[index - 1];
                if (prevInput) {
                    prevInput.focus();
                }
            } else if (
                event.key === "ArrowDown" &&
                index < inputRefs.current.length - 1
            ) {
                const nextInput = inputRefs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const correct =
        word.isCorrect === null || word.isCorrect === undefined
            ? ""
            : word.isCorrect
            ? "correct"
            : "incorrect";

    return (
        <div className={`test-mode-page__item ${correct}`}>
            <div className="test-mode-page__count">
                {index + 1} of {testWords.length}
                <div className="test-mode-page__star">
                    <Star id={word.id} checked={word.starred} />
                </div>
            </div>
            <div className="test-mode-page__value">{word.value}</div>
            <div className={`test-mode-page__answer ${correct}`}>
                {word.word}
            </div>
            <input
                className="test-mode-page__input"
                type="text"
                placeholder="answer"
                value={word.input}
                disabled={isShowedResult}
                onChange={(event) => onSetInput(event, word.id)}
                onBlur={() => onInputBlur(word)}
                ref={(el) => {
                    if (el) {
                        inputRefs.current![index] = el;
                    }
                }}
                onKeyDown={(event) => handleKeyDown(event)}
            />
        </div>
    );
};

export default TestPageListItem;

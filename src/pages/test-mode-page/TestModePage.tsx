/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCardSliceData } from "../../store/reducers/cardSlice";
import useBoards from "../../hooks/useBoards";
import { IAnswer } from "../../models/IAnswer";
import { IWord } from "../../models/IBoard";
import shuffle from "../../utils/shuffleArray";

import { Spinner, Error } from "../../components/UI";

import "./testmodepage.sass";

const TestModePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { boardId, cardId } = useParams();
    const { fetchedBoards, isError, isLoading } = useBoards();
    const { card } = useAppSelector((state) => state.cardSlice);
    const [filledAnswersCount, setFilledAnswersCount] = useState(0);
    const [inputWords, setInputWords] = useState([] as IAnswer[]);
    const [isShowedResults, setIsShowedResults] = useState(false);
    const [wrongCount, setWrongCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [words, setWords] = useState([] as IWord[]);

    useEffect(() => {
        if (boardId && cardId && !isLoading && !isError) {
            dispatch(
                setCardSliceData({
                    boards: fetchedBoards,
                    id: { boardId, cardId },
                })
            );
        }
    }, [fetchedBoards]);

    useEffect(() => {
        setWords(card.words && [...card.words]);
    }, [card]);

    useEffect(() => {
        setInputWords(
            words &&
                words.map((item) => {
                    return { ...item, input: "", answer: "" };
                })
        );
    }, [words]);

    const onSetInput = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        setInputWords((prevState) =>
            prevState.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        input: event.target.value,
                    };
                }
                return item;
            })
        );
    };

    const onInputBlur = (word: IAnswer) => {
        setInputWords((prevState) =>
            prevState.map((item) => {
                if (item.id === word.id) {
                    if (word.input !== item.answer) {
                        if (item.answer === "") {
                            setFilledAnswersCount((prevState) => prevState + 1);
                        } else if (word.input === "" && item.answer) {
                            setFilledAnswersCount((prevState) => prevState - 1);
                        }
                        return { ...item, answer: word.input };
                    }
                }
                return item;
            })
        );
    };

    const onSubmitTest = () => {
        setInputWords((prevState) =>
            prevState.map((item) => {
                if (item.answer === item.word) {
                    setRightCount((prevState) => prevState + 1);
                    return { ...item, isCorrect: true };
                }
                setWrongCount((prevState) => prevState + 1);
                return { ...item, isCorrect: false };
            })
        );
        setIsShowedResults(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.key === "ArrowUp" && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (
            event.key === "ArrowDown" &&
            index < inputRefs.current.length - 1
        ) {
            inputRefs.current[index + 1].focus();
        }
    };

    const onRetryTest = () => {
        setWords(shuffle(words));
        setInputWords(
            words &&
                words.map((item) => {
                    return { ...item, input: "", answer: "" };
                })
        );
        setFilledAnswersCount(0);
        setIsShowedResults(false);
        setWrongCount(0);
        setRightCount(0);
    };

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <Error />;
    }

    return (
        <section className="test-mode-page">
            <div className="test-mode-page__header">
                <div
                    className="card-mode-page__link"
                    onClick={() => navigate(-1)}
                >
                    Back
                </div>

                <div className="card-mode-page__title">
                    {filledAnswersCount} / {card.words && card.words.length}
                    <br />
                    {card.title && card.title}
                </div>
            </div>
            <div className="container">
                <div className="test-mode-page__container">
                    <div
                        className={`test-mode-page__results ${
                            isShowedResults ? "showed" : ""
                        }`}
                    >
                        <div>
                            {rightCount > wrongCount
                                ? "Well done, keep it up!"
                                : "Don't give up, trust the process!"}
                        </div>
                        <div className="test-mode-page__right">
                            Right answers : {rightCount}
                        </div>
                        <div className="test-mode-page__wrong">
                            Wrong answers : {wrongCount}
                        </div>
                        <button
                            className="test-mode-page__retry"
                            onClick={onRetryTest}
                        >
                            Retry!
                        </button>
                    </div>

                    {inputWords &&
                        inputWords.map((word, key) => {
                            const correct =
                                word.isCorrect === undefined
                                    ? ""
                                    : word.isCorrect
                                    ? "correct"
                                    : "incorrect";
                            return (
                                <div
                                    className={`test-mode-page__item ${correct}`}
                                    key={word.id}
                                >
                                    <div className="test-mode-page__count">
                                        {key + 1} of {inputWords.length}
                                    </div>
                                    <div className="test-mode-page__value">
                                        {word.value}
                                    </div>
                                    <div
                                        className={`test-mode-page__answer ${correct}`}
                                    >
                                        {word.word}
                                    </div>
                                    <input
                                        className="test-mode-page__input"
                                        type="text"
                                        placeholder="answer"
                                        value={word.input}
                                        disabled={isShowedResults}
                                        onChange={(event) =>
                                            onSetInput(event, word.id)
                                        }
                                        onBlur={() => onInputBlur(word)}
                                        ref={(el) => {
                                            if (el) {
                                                inputRefs.current[key] = el;
                                            }
                                        }}
                                        onKeyDown={(event) =>
                                            handleKeyDown(event, key)
                                        }
                                    />
                                </div>
                            );
                        })}
                </div>
                <button
                    disabled={isShowedResults}
                    className={`test-mode-page__submit ${
                        isShowedResults ? "disabled" : ""
                    }`}
                    onClick={onSubmitTest}
                >
                    Submit test
                </button>
            </div>
        </section>
    );
};

export default TestModePage;

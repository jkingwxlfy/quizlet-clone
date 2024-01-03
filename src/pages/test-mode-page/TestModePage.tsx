/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    setCardSliceData,
    setFilledAnswerCount,
} from "../../store/reducers/cardSlice";
import useBoards from "../../hooks/useBoards";
import shuffle from "../../utils/shuffleArray";
import { setTestWords } from "../../store/reducers/cardSlice";

import TestPageList from "../../components/test-page-list/TestPageList";
import TestPageResult from "../../components/test-page-result/TestPageResult";
import { Spinner, Error } from "../../components/UI";

import "./testmodepage.sass";

const TestModePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { boardId, cardId } = useParams();
    const { fetchedBoards, isError, isLoading } = useBoards();
    const { card, testWords, filledAnswersCount } = useAppSelector(
        (state) => state.cardSlice
    );
    const [isShowedResults, setIsShowedResults] = useState(false);
    const [wrongCount, setWrongCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);

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
        const testWords =
            card.words &&
            card.words.map((item) => {
                return { ...item, input: "", answer: "" };
            });

        dispatch(setTestWords(testWords));
    }, [card]);

    const onSubmitTest = () => {
        const newTestWords = testWords.map((item) => {
            if (item.answer.trim() === item.word.trim()) {
                setRightCount((prevState) => prevState + 1);
                return { ...item, isCorrect: true };
            }
            setWrongCount((prevState) => prevState + 1);
            return { ...item, isCorrect: false };
        });
        dispatch(setTestWords(newTestWords));
        setIsShowedResults(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const onRetryTest = () => {
        const newTestWords = shuffle(
            testWords.map((word) => {
                return { ...word, input: "", answer: "", isCorrect: null };
            })
        );
        dispatch(setTestWords(newTestWords));
        dispatch(setFilledAnswerCount(0));
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
                    <TestPageResult
                        isShowedResults={isShowedResults}
                        rightCount={rightCount}
                        wrongCount={wrongCount}
                        onRetryTest={onRetryTest}
                    />
                    <TestPageList words={testWords} />
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

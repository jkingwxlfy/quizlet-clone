/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    filterWords,
    resetAndShuffleTestWords,
    setCardSliceData,
    setFilledAnswerCount,
    setIsShowedResults,
} from "../../store/reducers/cardSlice";
import { setTestWords } from "../../store/reducers/cardSlice";
import { useGetBoardsQuery } from "../../store/reducers/apiSlice";
import { IBoard } from "../../models/IBoard";

import TestPageList from "../../components/test-page-list/TestPageList";
import TestPageResult from "../../components/test-page-result/TestPageResult";
import { Spinner, Error } from "../../components/UI";

import "./testmodepage.sass";

const TestModePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { boardId, cardId } = useParams();
    const {
        data: fetchedBoards = [] as IBoard[],
        isError,
        isLoading,
    } = useGetBoardsQuery("");
    const {
        card,
        testWords,
        filledAnswersCount,
        isShowedResult,
        filteredWords,
    } = useAppSelector((state) => state.cardSlice);
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
            dispatch(filterWords());
        }
    }, [fetchedBoards]);

    useEffect(() => {
        if (testWords.length && !card.onlyStars) {
            const newTestWords = testWords.map((item) => {
                for (let key = 0; key < filteredWords.length; key++) {
                    if (
                        item.id === filteredWords[key].id &&
                        item.starred !== filteredWords[key].starred
                    ) {
                        return { ...item, starred: filteredWords[key].starred };
                    }
                }
                return item;
            });
            dispatch(setTestWords(newTestWords));
        } else if (testWords.length && card.onlyStars) {
            const newTestWords = testWords.filter((item) => {
                const correspondingFilteredItem = filteredWords.find(
                    (filteredItem) => item.id === filteredItem.id
                );
                if (correspondingFilteredItem) {
                    return correspondingFilteredItem
                        ? item.starred === correspondingFilteredItem.starred
                        : false;
                }
                return false;
            });
            if (testWords.length !== 0 && filledAnswersCount !== 0) {
                dispatch(setFilledAnswerCount(filledAnswersCount - 1));
            }
            dispatch(setTestWords(newTestWords));
        } else {
            const testWords = filteredWords.map((item) => {
                return { ...item, answer: "", input: "", isCorrect: null };
            });
            dispatch(setTestWords(testWords));
        }

        if (!filteredWords.length) {
            navigate(-1);
        }
    }, [filteredWords]);

    useEffect(() => {
        return () => {
            dispatch(setIsShowedResults(false));
            dispatch(setFilledAnswerCount(0));
        };
    }, []);

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
        dispatch(setIsShowedResults(true));
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const onRetryTest = () => {
        dispatch(resetAndShuffleTestWords());
        dispatch(setFilledAnswerCount(0));
        dispatch(setIsShowedResults(false));
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
                    {filledAnswersCount} / {testWords.length}
                    <br />
                    {card.title && card.title}
                </div>
            </div>
            <div className="container">
                <div className="test-mode-page__container">
                    <TestPageResult
                        isShowedResults={isShowedResult}
                        rightCount={rightCount}
                        wrongCount={wrongCount}
                        onRetryTest={onRetryTest}
                    />
                    <TestPageList />
                </div>
                <button
                    disabled={isShowedResult}
                    className={`test-mode-page__submit ${
                        isShowedResult ? "disabled" : ""
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

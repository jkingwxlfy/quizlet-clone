/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import {
    filterWords,
    setCardSliceData,
    shuffleFilteredWords,
} from "../../store/reducers/cardSlice";
import useBoards from "../../hooks/useBoards";
import { IWord } from "../../models/IBoard";

import { Spinner, Error, Star } from "../../components/UI";

import "./cardmodepage.sass";

const CardModePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { boardId, cardId } = useParams();
    const { fetchedBoards, isError, isLoading } = useBoards();
    const { card, filteredWords } = useAppSelector((state) => state.cardSlice);

    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState({} as IWord);
    const [isHidden, setIsHidden] = useState(false);

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
        dispatch(filterWords());
    }, [card]);

    useEffect(() => {
        if (filteredWords.length) {
            setCurrentWord(filteredWords[index]);
            setIsHidden(false);
        } else {
            navigate(-1);
        }
    }, [filteredWords, index]);

    const onNext = () => {
        if (filteredWords.length) {
            if (index < filteredWords.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }
    };

    const onPrev = () => {
        if (filteredWords.length) {
            if (index === 0) {
                setIndex(filteredWords.length - 1);
            } else {
                setIndex(index - 1);
            }
        }
    };

    const onShuffle = () => {
        dispatch(shuffleFilteredWords());
        setCurrentWord(filteredWords[index]);
        setIndex(0);
    };

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <Error />;
    }

    return (
        <section className="card-mode-page">
            <div className="card-mode-page__link" onClick={() => navigate(-1)}>
                Back
            </div>
            <div className="container">
                <div className="card-mode-page__header">
                    <div className="card-mode-page__title">
                        {index + 1} / {filteredWords.length} <br />
                        {card.title && card.title}
                    </div>
                </div>
                <div className="card-mode-page__container">
                    <div
                        className="card-mode-page__card"
                        onClick={() => setIsHidden(!isHidden)}
                    >
                        <div className="card-mode-page__word">
                            {currentWord !== undefined && isHidden
                                ? currentWord.word
                                : currentWord.value}
                        </div>
                        <div className="card-mode-page__star">
                            <Star
                                id={currentWord.id}
                                checked={currentWord.starred}
                            />
                        </div>
                    </div>
                    <div className="card-mode-page__buttons">
                        <div
                            className="card-mode-page__button"
                            onClick={onPrev}
                        >
                            Previous
                        </div>
                        <div
                            className="card-mode-page__button"
                            onClick={onShuffle}
                        >
                            Shuffle
                        </div>
                        <div
                            className="card-mode-page__button"
                            onClick={onNext}
                        >
                            Next
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardModePage;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setCardSliceData } from "../../store/reducers/cardSlice";
import useBoards from "../../hooks/useBoards";
import { IWord } from "../../models/IBoard";
import shuffle from "../../utils/shuffleArray";

import { Spinner, Error } from "../../components/UI";

import "./cardmodepage.sass";

const CardModePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { boardId, cardId } = useParams();
    const { fetchedBoards, isError, isLoading } = useBoards();
    const { card } = useAppSelector((state) => state.cardSlice);

    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState({} as IWord);
    const [isHidden, setIsHidden] = useState(false);
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
        if (card.words !== undefined) {
            setWords([...card.words]);
        }
    }, [card]);

    useEffect(() => {
        if (words.length) {
            setCurrentWord(words[index]);
            setIsHidden(false);
        }
    }, [words, index]);

    const onNext = () => {
        if (words.length) {
            if (index < words.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }
    };

    const onPrev = () => {
        if (words.length) {
            if (index === 0) {
                setIndex(card.words.length - 1);
            } else {
                setIndex(index - 1);
            }
        }
    };

    const onShuffle = () => {
        setWords(shuffle(words));
        setCurrentWord(words[index]);
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
                        {index + 1} / {card.words && card.words.length} <br />
                        {card.title && card.title}
                    </div>
                </div>
                <div className="card-mode-page__container">
                    <div
                        className="card-mode-page__card"
                        onClick={() => setIsHidden(!isHidden)}
                    >
                        <div className="card-mode-page__word">
                            {currentWord && isHidden
                                ? currentWord.word
                                : currentWord.value}
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

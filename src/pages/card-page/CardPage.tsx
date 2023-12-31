/* eslint-disable react-hooks/exhaustive-deps */
import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import useBoards from "../../hooks/useBoards";
import {
    filterWords,
    setCardSliceData,
    editCardData,
} from "../../store/reducers/cardSlice";

import ModeList from "../../components/mode-list/ModeList";
import WordList from "../../components/word-list/WordList";
import WordListForm from "../../components/word-list-form/WordListForm";
import CardFormEdit from "../../components/card-form-edit/CardFormEdit";
import CardFormDelete from "../../components/card-form-delete/CardFormDelete";
import SearchBar from "../../components/search-bar/SearchBar";
import { Spinner, MyModal, Error } from "../../components/UI";

import "./card-page.sass";

const CardPage: React.FC = () => {
    const { boardId, cardId } = useParams();
    const navigate = useNavigate();
    const [editCardModal, setEditCardModal] = useState(false);
    const [deleteCardModal, setDeleteCardModal] = useState(false);
    const dispatch = useAppDispatch();
    const { fetchedBoards, isError, isLoading } = useBoards();
    const [editBoard] = useEditBoardMutation();
    const { card, board } = useAppSelector((state) => state.cardSlice);

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
        console.log("card page effect");
    }, [card]);

    const onSetCompletedCard = (event: ChangeEvent<HTMLInputElement>) => {
        const completed = event.target.checked;
        const newCards =
            board.cards &&
            board.cards.map((cardItem) => {
                if (cardItem.id === card.id) {
                    return { ...cardItem, completed };
                } else {
                    return cardItem;
                }
            });
        dispatch(editCardData({ ...card, completed }));
        editBoard({ ...board, cards: newCards });
    };

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <Error />;
    }

    return (
        <section className="card-page">
            <div className="card-page__header">
                <button
                    className="card-page__header__link"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <h1
                    className={`card-page__title ${
                        card.completed && card.completed ? "completed" : ""
                    }`}
                >
                    {card && card.title && card.title} (
                    {card && card.words && card.words.length})
                </h1>
                <label className="card-page__label">
                    <p>Completed</p>
                    <input
                        className="card-page__checkbox"
                        type="checkbox"
                        onChange={(event) => onSetCompletedCard(event)}
                        checked={card.completed && card.completed}
                    />
                </label>
                <button
                    className="card-page__header__button"
                    onClick={() => setEditCardModal(true)}
                >
                    Rename
                </button>
                <button
                    className="card-page__header__button"
                    onClick={() => setDeleteCardModal(true)}
                >
                    Delete
                </button>
                <MyModal isModal={editCardModal} setModal={setEditCardModal}>
                    <CardFormEdit setModal={setEditCardModal} />
                </MyModal>
                <MyModal
                    isModal={deleteCardModal}
                    setModal={setDeleteCardModal}
                >
                    <CardFormDelete
                        setModal={setDeleteCardModal}
                        cardId={cardId!}
                    />
                </MyModal>
            </div>
            <div className="container">
                <div className="card-page__container">
                    <ModeList />
                    <SearchBar />
                </div>
                <WordListForm />
                <WordList />
            </div>
        </section>
    );
};

export default CardPage;

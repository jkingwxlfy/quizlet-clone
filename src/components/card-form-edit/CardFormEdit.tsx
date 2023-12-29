import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { setNewBoard } from "../../store/reducers/boardsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICard } from "../../models/IBoard";
import { useState } from "react";

interface CardFormEditProps {
    setModal: (isModal: boolean) => void;
}

const CardFormEdit: React.FC<CardFormEditProps> = ({ setModal }) => {
    const { card, board } = useAppSelector((state) => state.cardSlice);
    const [input, setInput] = useState("");
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const newCards =
        board.cards &&
        board.cards.map((cardItem: ICard) => {
            if (cardItem.id === card.id) {
                return { ...cardItem, title: input };
            } else {
                return cardItem;
            }
        });

    const changeName = () => {
        const newBoard = { ...board, cards: newCards };
        dispatch(setNewBoard(newBoard));
        editBoard(newBoard);
        setModal(false);
        setInput("");
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a new name</h1>
            <input
                className="board-menu-form__input"
                type="text"
                placeholder="new name"
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            <button className="board-menu-form__button" onClick={changeName}>
                Confirm
            </button>
        </div>
    );
};

export default CardFormEdit;

import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { editCardData } from '../../store/reducers/cardSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { ICard } from '../../models/IBoard';
import { useState } from 'react';

interface ICardFormEditProps {
    setModal: (isModal: boolean) => void;
}

const CardFormEdit: React.FC<ICardFormEditProps> = ({ setModal }) => {
    const { card, board } = useAppSelector((state) => state.cardSlice);
    const [input, setInput] = useState('');
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const changeName = () => {
        const newCards =
            board.cards &&
            board.cards.map((cardItem: ICard) => {
                if (cardItem.id === card.id) {
                    return { ...cardItem, title: input };
                } else {
                    return cardItem;
                }
            });
        dispatch(editCardData({ ...card, title: input }));
        editBoard({ ...board, cards: newCards });
        setModal(false);
        setInput('');
    };

    return (
        <div className="sidebar-form">
            <h1 className="sidebar-form__title">Enter a new name</h1>
            <input
                className="sidebar-form__input"
                type="text"
                placeholder="new name"
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            <button className="sidebar-form__button" onClick={changeName}>
                Confirm
            </button>
        </div>
    );
};

export default CardFormEdit;

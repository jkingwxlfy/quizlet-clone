import type { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editCardData } from '../../../store/reducers/cardSlice';
import { useEditBoardMutation } from '../../../store/reducers/apiSlice';

import './star.scss';

interface IStarProps {
    id: string;
    checked: boolean;
}

const Star: React.FC<IStarProps> = ({ id, checked }) => {
    const dispatch = useAppDispatch();
    const { card, board } = useAppSelector((state) => state.cardSlice);
    const [editBoard] = useEditBoardMutation();

    const onSetStarred = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const starred = event.target.checked;
        const newCard = {
            ...card,
            words: card.words.map((item) => {
                if (item.id === id) {
                    return { ...item, starred: starred };
                }
                return item;
            }),
        };
        dispatch(editCardData(newCard));

        const newCards = board.cards.map((cardItem) => {
            if (cardItem.id === card.id) {
                return newCard;
            } else {
                return cardItem;
            }
        });
        editBoard({ ...board, cards: newCards });
    };

    return (
        <label className="star">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onSetStarred(event)}
            />
            <span />
        </label>
    );
};

export default Star;

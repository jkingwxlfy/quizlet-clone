import { useState } from 'react';
import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { ICard, IWord } from '../../models/IBoard';
import { editCardData, setSearchQuery } from '../../store/reducers/cardSlice';
import { v4 as uuidv4 } from 'uuid';

import './wordlistform.scss';

const WordListForm: React.FC = () => {
    const { board, card, searchQuery } = useAppSelector(
        (state) => state.cardSlice
    );
    const [expression, setExpression] = useState('');
    const [definition, setDefinition] = useState('');
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const onHandleEnter = (keyPress: React.KeyboardEvent<HTMLDivElement>) => {
        if (keyPress.key === 'Enter') {
            onAddWord();
        }
    };

    const onAddWord = () => {
        if (expression.length || definition.length) {
            const word: IWord = {
                word: expression,
                value: definition,
                starred: false,
                id: uuidv4(),
            };

            const newCards = board.cards.map((itemCard: ICard) => {
                if (itemCard.id === card.id) {
                    return { ...itemCard, words: [word, ...itemCard.words] };
                } else {
                    return itemCard;
                }
            });

            editBoard({ ...board, cards: newCards });
            dispatch(editCardData({ ...card, words: [word, ...card.words] }));
            dispatch(setSearchQuery(searchQuery));
            setExpression('');
            setDefinition('');
        }
    };

    return (
        <div
            className="word-list-form"
            onKeyDown={(keyPress) => onHandleEnter(keyPress)}
        >
            <div className="word-list-form__container">
                <input
                    className="word-list-form__input"
                    type="text"
                    placeholder="Expression"
                    value={expression}
                    onChange={(event) => setExpression(event.target.value)}
                />
                <div className="word-list-form__separator">:</div>
                <input
                    className="word-list-form__input"
                    type="text"
                    placeholder="Definition"
                    value={definition}
                    onChange={(event) => setDefinition(event.target.value)}
                />
                <button className="word-list-form__button" onClick={onAddWord}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default WordListForm;

import { useState } from "react";
import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICard, IWord } from "../../models/IBoard";
import { setNewBoard } from "../../store/reducers/boardsSlice";
import { v4 as uuidv4 } from "uuid";

import "./wordlistform.sass";

const WordListForm: React.FC = () => {
    const { board, card } = useAppSelector((state) => state.cardSlice);
    const [expression, setExpression] = useState("");
    const [definition, setDefinition] = useState("");
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const onAddWord = () => {
        const word: IWord = {
            word: expression,
            value: definition,
            id: uuidv4(),
        };
        const newCards: ICard[] = board.cards.map((itemCard: ICard) => {
            if (itemCard.id === card.id) {
                return { ...itemCard, words: [word, ...itemCard.words] };
            } else {
                return itemCard;
            }
        });
        const newBoard = { ...board, cards: newCards };
        editBoard(newBoard);
        dispatch(setNewBoard(newBoard));
        setExpression("");
        setDefinition("");
    };

    return (
        <div className="word-list-form">
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

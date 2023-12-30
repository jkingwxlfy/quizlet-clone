import { useState } from "react";
import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { editCardData } from "../../store/reducers/cardSlice";
import { ICard, IWord } from "../../models/IBoard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import "./wordlistitem.sass";

interface WordListItemProps {
    word: IWord;
}

const WordListItem: React.FC<WordListItemProps> = ({ word }) => {
    const [editBoard] = useEditBoardMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [expression, setExpression] = useState("");
    const [definition, setDefinition] = useState("");
    const { card, board } = useAppSelector((state) => state.cardSlice);
    const dispatch = useAppDispatch();

    const onDeleteWord = () => {
        const newCard: ICard = {
            ...card,
            words: card.words.filter(
                (itemWord: IWord) => itemWord.id !== word.id
            ),
        };
        const newCards = board.cards.map((itemCard: ICard) => {
            if (itemCard.id === newCard.id) {
                return { ...itemCard, words: newCard.words };
            }
            return itemCard;
        });
        editBoard({ ...board, cards: newCards });
        dispatch(editCardData(newCard));
    };

    const onEditWord = () => {
        if (!expression && !definition) {
            setIsEditing(false);
            return;
        }

        const newCard: ICard = {
            ...card,
            words: card.words.map((itemWord: IWord) => {
                if (itemWord.id === word.id) {
                    return {
                        ...word,
                        word: expression ? expression : word.word,
                        value: definition ? definition : word.value,
                    };
                }
                return itemWord;
            }),
        };
        const newCards = board.cards.map((itemCard: ICard) => {
            if (itemCard.id === newCard.id) {
                return { ...itemCard, words: newCard.words };
            }
            return itemCard;
        });
        editBoard({ ...board, cards: newCards });
        dispatch(editCardData(newCard));

        setIsEditing(false);
        setExpression("");
        setDefinition("");
    };

    const clazzWord = isEditing
        ? "word-list-item__word hidden"
        : "word-list-item__word";

    const clazzInput = isEditing
        ? "word-list-item__input"
        : "word-list-item__input hidden";

    const clazzButton = isEditing
        ? "word-list-item__button"
        : "word-list-item__button hidden";

    return (
        <div className="word-list-item">
            <div className="word-list-item__words">
                <div className={clazzWord}>{word.word}</div>
                <input
                    className={clazzInput}
                    type="text"
                    placeholder={word.word}
                    value={expression}
                    onChange={(event) => setExpression(event.target.value)}
                />
                <div className="word-list-form__separator">:</div>
                <div className={clazzWord}>{word.value}</div>
                <input
                    className={clazzInput}
                    type="text"
                    placeholder={word.value}
                    value={definition}
                    onChange={(event) => setDefinition(event.target.value)}
                />
                <button className={clazzButton} onClick={onEditWord}>
                    Save
                </button>
            </div>
            <div className="word-list-item__buttons">
                <button
                    className="word-list-item__button"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
                <button
                    className="word-list-item__button"
                    onClick={onDeleteWord}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default WordListItem;

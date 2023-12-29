import { IWord } from "../../models/IBoard";
import { useAppSelector } from "../../hooks/redux";

import WordListItem from "../word-list-item/WordListItem";

import "./wordlist.sass";

const WordList: React.FC = () => {
    const { card } = useAppSelector((state) => state.cardSlice);
    return (
        <div className="word-list">
            {card.words && card.words.length ? (
                card.words.map((word: IWord) => (
                    <WordListItem word={word} key={word.id} />
                ))
            ) : (
                <h1 className="word-list__empty">No words</h1>
            )}
        </div>
    );
};

export default WordList;

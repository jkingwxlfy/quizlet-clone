import { IWord } from "../../models/IBoard";
import { useAppSelector } from "../../hooks/redux";

import WordListItem from "../word-list-item/WordListItem";

import "./wordlist.sass";

const WordList: React.FC = () => {
    const { filteredWords, card } = useAppSelector((state) => state.cardSlice);

    const array = !filteredWords
        ? card.words && card.words
        : filteredWords && filteredWords;

    return (
        <div className="word-list">
            {array.length ? (
                array.map((word: IWord) => (
                    <WordListItem word={word} key={word.id} />
                ))
            ) : (
                <h1 className="word-list__empty">No words</h1>
            )}
        </div>
    );
};

export default WordList;

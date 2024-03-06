import type { IWord } from '../../models/IBoard';
import { useAppSelector } from '../../hooks/redux';

import WordListItem from '../word-list-item/WordListItem';

import './wordlist.scss';

const WordList: React.FC = () => {
    const { filteredWords, card } = useAppSelector((state) => state.cardSlice);

    const words = filteredWords
        ? filteredWords
        : card && card.words && card.words;

    return (
        <div className="word-list">
            {words && words.length ? (
                words.map((word: IWord) => (
                    <WordListItem word={word} key={word.id} />
                ))
            ) : (
                <h1 className="word-list__empty">No words</h1>
            )}
        </div>
    );
};

export default WordList;

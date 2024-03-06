import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

import './modelistitem.scss';

interface IModeListItemProps {
    name: string;
}

const ModeListItem: React.FC<IModeListItemProps> = ({ name }) => {
    const { card, board, filteredWords } = useAppSelector(
        (state) => state.cardSlice
    );
    return (
        <Link
            className={`mode-list-item ${
                !filteredWords.length ? 'disabled' : ''
            }`}
            to={`/boards/${board.id}/${card.id}/${name}`}
        >
            {name}
        </Link>
    );
};

export default ModeListItem;

import type { ICard, IBoard } from '../../models/IBoard';
import { Link } from 'react-router-dom';

import './cardlistitem.scss';

interface ICardListItemProps {
    card: ICard;
    board: IBoard;
}

const CardListItem: React.FC<ICardListItemProps> = ({ card, board }) => {
    let title = '';
    if (card.title.length > 10) {
        title = card.title.slice(0, 10) + '...';
    }

    return (
        <Link className="card-list-item" to={`/boards/${board.id}/${card.id}`}>
            <div
                className={`card-list-item__title ${
                    card.completed && card.completed ? 'completed' : ''
                }`}
            >
                {title ? title : card.title}
            </div>
        </Link>
    );
};

export default CardListItem;

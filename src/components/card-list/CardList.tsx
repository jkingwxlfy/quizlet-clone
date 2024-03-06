import CardListItem from '../card-list-item/CardListItem';
import type { IBoard } from '../../models/IBoard';

import './cardlist.scss';

interface ICardListProps {
    board: IBoard;
}

const CardList: React.FC<ICardListProps> = ({ board }) => {
    return (
        <div className="card-list">
            {board.cards.map((card) => (
                <CardListItem key={card.id} card={card} board={board} />
            ))}
        </div>
    );
};

export default CardList;

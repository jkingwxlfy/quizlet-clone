import CardListItem from "../card-list-item/CardListItem";
import { IBoard } from "../../models/IBoard";

import "./cardlist.sass";

interface CardListProps {
    board: IBoard;
}

const CardList: React.FC<CardListProps> = ({ board }) => {
    return (
        <div className="card-list">
            {board.cards.map((card) => (
                <CardListItem key={card.id} card={card} board={board} />
            ))}
        </div>
    );
};

export default CardList;

import { ICard, IBoard } from "../../models/IBoard";
import { Link } from "react-router-dom";

import "./cardlistitem.sass";

interface CardListItemProps {
    card: ICard;
    board: IBoard;
}

const CardListItem: React.FC<CardListItemProps> = ({ card, board }) => {
    let title = "";
    if (card.title.length > 10) {
        title = card.title.slice(0, 10) + "...";
    }

    return (
        <div className="card-list-item">
            <div
                className={`card-list-item__title ${
                    card.completed && card.completed ? "completed" : ""
                }`}
            >
                {title ? title : card.title}
            </div>
            <Link
                className="card-list-item__button"
                to={`/boards/${board.id}/${card.id}`}
            >
                Open
            </Link>
        </div>
    );
};

export default CardListItem;

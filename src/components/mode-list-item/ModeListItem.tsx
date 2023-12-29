import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

import "./modelistitem.sass";

interface ModeListItemProps {
    name: string;
}

const ModeListItem: React.FC<ModeListItemProps> = ({ name }) => {
    const { card, board } = useAppSelector((state) => state.cardSlice);
    return (
        <Link
            className="mode-list-item"
            to={`/boards/${board.id}/${card.id}/${name}`}
        >
            {name}
        </Link>
    );
};

export default ModeListItem;

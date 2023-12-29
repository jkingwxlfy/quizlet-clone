import { NavLink } from "react-router-dom";

import "./boardmenuitem.sass";

interface BoardMenuItemProps {
    name: string;
    id: string;
}

const BoardMenuItem: React.FC<BoardMenuItemProps> = ({ name, id }) => {
    return (
        <section className="board-menu-item">
            <div className="board-menu-item__name">{name}</div>
            <NavLink
                className={(navData) =>
                    navData.isActive
                        ? "board-menu-item__button active"
                        : "board-menu-item__button"
                }
                to={`/boards/${id}`}
            >
                Open
            </NavLink>
        </section>
    );
};

export default BoardMenuItem;

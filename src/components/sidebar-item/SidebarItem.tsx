import { NavLink, Link } from 'react-router-dom';

import './sidebaritem.scss';

interface ISidebarItemProps {
    name: string;
    id: string;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ name, id }) => {
    return (
        <Link className="board-menu-item" to={`/boards/${id}`}>
            <div className="board-menu-item__name">{name}</div>
            <NavLink
                className={(navData) =>
                    navData.isActive
                        ? 'board-menu-item__button active'
                        : 'board-menu-item__button'
                }
                to={`/boards/${id}`}
            >
                Open
            </NavLink>
        </Link>
    );
};

export default SidebarItem;

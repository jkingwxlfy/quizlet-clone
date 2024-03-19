import { NavLink } from 'react-router-dom';

import './sidebaritem.scss';

interface ISidebarItemProps {
    name: string;
    id: string;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ name, id }) => {
    return (
        <NavLink
            className={(navData) =>
                navData.isActive ? 'sidebar-item active' : 'sidebar-item'
            }
            to={`/boards/${id}`}
        >
            <div className="sidebar-item__name">{name}</div>
        </NavLink>
    );
};

export default SidebarItem;

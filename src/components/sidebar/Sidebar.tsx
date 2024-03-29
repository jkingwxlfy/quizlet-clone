import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useGetBoardsQuery } from '../../store/reducers/apiSlice';
import type { IBoard } from '../../models/IBoard';
import { setAllBoards } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import BoardMenuItem from '../sidebar-item/SidebarItem';
import BoardMenuForm from '../sidebar-form/SidebarForm';
import { MyModal, Spinner, Error } from '../UI';

import './sidebar.scss';

const Sidebar: React.FC = () => {
    const [isModal, setIsModal] = useState(false);
    const {
        data: fetchedBoards = [] as IBoard[],
        isError,
        isLoading,
    } = useGetBoardsQuery('');
    const dispatch = useAppDispatch();
    const { boards } = useAppSelector((state) => state.boardsSlice);
    const [createInput, setCreateInput] = useState('');

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <Error />;
    } else {
        dispatch(setAllBoards(fetchedBoards));
    }

    return (
        <section className="app">
            <section className="sidebar-menu">
                <div className="sidebar-menu__container">
                    <h1 className="sidebar-menu__title">Boards</h1>
                    <button
                        className="sidebar-menu__button"
                        onClick={() => setIsModal(true)}
                    >
                        Create board
                    </button>
                    <MyModal
                        isModal={isModal}
                        setModal={setIsModal}
                        setInput={setCreateInput}
                    >
                        <BoardMenuForm
                            setModal={setIsModal}
                            input={createInput}
                            setInput={setCreateInput}
                        />
                    </MyModal>
                    {boards.map((board) => (
                        <BoardMenuItem
                            key={board.id}
                            name={board.title}
                            id={board.id}
                        />
                    ))}
                </div>
            </section>
            <Outlet />
        </section>
    );
};

export default Sidebar;

import { Outlet } from "react-router-dom";
import { useState } from "react";
import useBoards from "../../hooks/useBoards";
import { useAppSelector } from "../../hooks/redux";

import BoardMenuItem from "../board-menu-item/BoardMenuItem";
import BoardMenuForm from "../board-menu-form/BoardMenuForm";
import { MyModal, Spinner, Error } from "../UI";

import "./boardmenu.sass";

const BoardMenu: React.FC = () => {
    const [isModal, setIsModal] = useState(false);
    const { isError, isLoading } = useBoards();
    const { boards } = useAppSelector((state) => state.boardsSlice);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
        return <Error />;
    }

    return (
        <section className="board__container">
            <section className="board-menu">
                <div className="board-menu__container">
                    <h1 className="board-menu__title">Boards</h1>
                    <button
                        className="board-menu__button"
                        onClick={() => setIsModal(true)}
                    >
                        Create board
                    </button>
                    <MyModal isModal={isModal} setModal={setIsModal}>
                        <BoardMenuForm setModal={setIsModal} />
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

export default BoardMenu;

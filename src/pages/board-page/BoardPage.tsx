import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IBoard } from "../../models/IBoard";

import BoardFormDelete from "../../components/board-form-delete/BoardFormDelete";
import BoardFormEdit from "../../components/board-form-edit/BoardFormEdit";
import BoardFormCreate from "../../components/board-form-create/BoardFormCreate";
import CardList from "../../components/card-list/CardList";
import { MyModal } from "../../components/UI";

import "./boardpage.sass";

const BoardPage: React.FC = () => {
    const { id } = useParams();
    const { boards } = useAppSelector((state) => state.boardsSlice);
    const board = boards.filter((board: IBoard) => board.id === id)[0];
    const [editBoardModal, setEditBoardModal] = useState(false);
    const [deleteBoardModal, setDeleteBoardModal] = useState(false);
    const [createCardModal, setCreateCardModal] = useState(false);

    if (!board) {
        return null;
    }

    return (
        <section className="board-page">
            <div className="board-page__header">
                <h1 className="board-page__header__title">{board?.title}</h1>
                <button
                    className="board-page__header__button"
                    onClick={() => setEditBoardModal(true)}
                >
                    Rename
                </button>
                <button
                    className="board-page__header__button"
                    onClick={() => setDeleteBoardModal(true)}
                >
                    Delete
                </button>
                <button
                    className="board-page__header__button"
                    onClick={() => setCreateCardModal(true)}
                >
                    Create card
                </button>
                <MyModal isModal={editBoardModal} setModal={setEditBoardModal}>
                    <BoardFormEdit setModal={setEditBoardModal} board={board} />
                </MyModal>
                <MyModal
                    isModal={deleteBoardModal}
                    setModal={setDeleteBoardModal}
                >
                    <BoardFormDelete
                        setModal={setDeleteBoardModal}
                        board={board}
                    />
                </MyModal>
                <MyModal
                    isModal={createCardModal}
                    setModal={setCreateCardModal}
                >
                    <BoardFormCreate
                        setModal={setCreateCardModal}
                        board={board}
                    />
                </MyModal>
            </div>
            <CardList board={board} />
        </section>
    );
};

export default BoardPage;

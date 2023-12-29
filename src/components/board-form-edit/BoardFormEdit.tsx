import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { changeBoardName } from "../../store/reducers/boardsSlice";
import { useAppDispatch } from "../../hooks/redux";
import { IBoard } from "../../models/IBoard";
import { useState } from "react";

interface BoardFormEditProps {
    setModal: (isModal: boolean) => void;
    board: IBoard;
}

const BoardFormEdit: React.FC<BoardFormEditProps> = ({ setModal, board }) => {
    const [input, setInput] = useState("");
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const changeName = () => {
        const newBoard = { ...board, title: input };
        editBoard(newBoard);
        dispatch(changeBoardName(newBoard));
        setInput("");
        setModal(false);
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a new name</h1>
            <input
                className="board-menu-form__input"
                type="text"
                placeholder="new name"
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            <button className="board-menu-form__button" onClick={changeName}>
                Confirm
            </button>
        </div>
    );
};

export default BoardFormEdit;

import React, { useState } from "react";
import { useCreateBoardMutation } from "../../store/reducers/apiSlice";
import { v4 as uuidv4 } from "uuid";
import { createOneBoard } from "../../store/reducers/boardsSlice";
import { useAppDispatch } from "../../hooks/redux";

import "./boardmenuform.sass";

interface BoardMenuFormProps {
    setModal: (isModal: boolean) => void;
}

const BoardMenuForm: React.FC<BoardMenuFormProps> = ({ setModal }) => {
    const [input, setInput] = useState("");
    const [createBoard] = useCreateBoardMutation();
    const dispatch = useAppDispatch();

    const onCreateBoard = () => {
        const newBoard = { id: uuidv4(), title: input, cards: [] };
        createBoard(newBoard);
        dispatch(createOneBoard(newBoard));
        setModal(false);
        setInput("");
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a board name</h1>
            <input
                className="board-menu-form__input"
                placeholder="name"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button className="board-menu-form__button" onClick={onCreateBoard}>
                Create
            </button>
        </div>
    );
};

export default BoardMenuForm;

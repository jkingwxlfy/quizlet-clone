import { useState } from "react";
import { IBoard } from "../../models/IBoard";
import { useEditBoardMutation } from "../../store/reducers/apiSlice";
import { createOneCard } from "../../store/reducers/boardsSlice";
import { useAppDispatch } from "../../hooks/redux";
import { v4 as uuidv4 } from "uuid";

interface BoardFormCreateProps {
    setModal: (isModal: boolean) => void;
    board: IBoard;
}

const BoardFormCreate: React.FC<BoardFormCreateProps> = ({
    setModal,
    board,
}) => {
    const [input, setInput] = useState("");
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();

    const onCreateCard = () => {
        const newBoard = {
            ...board,
            cards: [
                ...board.cards,
                {
                    id: uuidv4(),
                    title: input,
                    completed: false,
                    onlyStars: false,
                    words: [],
                },
            ],
        };
        editBoard(newBoard);
        dispatch(createOneCard(newBoard));
        setModal(false);
        setInput("");
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a card name</h1>
            <input
                className="board-menu-form__input"
                placeholder="name"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <button className="board-menu-form__button" onClick={onCreateCard}>
                Create
            </button>
        </div>
    );
};

export default BoardFormCreate;

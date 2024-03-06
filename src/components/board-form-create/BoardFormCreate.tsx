import type { IBoard } from '../../models/IBoard';
import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { createOneCard } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { v4 as uuidv4 } from 'uuid';
import { setInputFormError } from '../../store/reducers/boardsSlice';

interface IBoardFormCreateProps {
    setModal: (isModal: boolean) => void;
    board: IBoard;
    input: string;
    setInput: (value: string) => void;
}

const BoardFormCreate: React.FC<IBoardFormCreateProps> = ({
    setModal,
    board,
    input,
    setInput,
}) => {
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();
    const { inputFormError } = useAppSelector((state) => state.boardsSlice);

    const onCreateCard = () => {
        if (input.length > 35) {
            dispatch(setInputFormError(true));
            return;
        }
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
        setInput('');
        dispatch(setInputFormError(false));
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a card name</h1>
            <input
                className={`board-menu-form__input${
                    inputFormError ? ' error' : ''
                }`}
                placeholder="name"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            {inputFormError ? 'Max length 35' : ''}
            <button className="board-menu-form__button" onClick={onCreateCard}>
                Create
            </button>
        </div>
    );
};

export default BoardFormCreate;

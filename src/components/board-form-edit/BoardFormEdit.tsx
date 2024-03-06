import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { changeBoardName } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { IBoard } from '../../models/IBoard';
import { setInputFormError } from '../../store/reducers/boardsSlice';

interface IBoardFormEditProps {
    setModal: (isModal: boolean) => void;
    board: IBoard;
    input: string;
    setInput: (value: string) => void;
}

const BoardFormEdit: React.FC<IBoardFormEditProps> = ({
    setModal,
    board,
    input,
    setInput,
}) => {
    const [editBoard] = useEditBoardMutation();
    const dispatch = useAppDispatch();
    const { inputFormError } = useAppSelector((state) => state.boardsSlice);

    const changeName = () => {
        if (input.length > 35) {
            dispatch(setInputFormError(true));
            return;
        }
        const newBoard = { ...board, title: input };
        editBoard(newBoard);
        dispatch(changeBoardName(newBoard));
        setInput('');
        setModal(false);
    };

    return (
        <div className="board-menu-form">
            <h1 className="board-menu-form__title">Enter a new name</h1>
            <input
                className={`board-menu-form__input${
                    inputFormError ? ' error' : ''
                }`}
                type="text"
                placeholder="new name"
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            {inputFormError ? 'Max length 35' : ''}
            <button className="board-menu-form__button" onClick={changeName}>
                Confirm
            </button>
        </div>
    );
};

export default BoardFormEdit;

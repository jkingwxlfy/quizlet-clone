import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { changeBoardName } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { IBoard } from '../../models/IBoard';
import { setInputFormMessage } from '../../store/reducers/boardsSlice';

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
    const { inputFormMessage } = useAppSelector((state) => state.boardsSlice);

    const changeName = () => {
        if (input.length > 35 || !input.length) {
            dispatch(setInputFormMessage('Incorrect value'));
            return;
        }
        const newBoard = { ...board, title: input };
        editBoard(newBoard);
        dispatch(changeBoardName(newBoard));
        setInput('');
        setModal(false);
    };

    return (
        <div className="sidebar-form">
            <h1 className="sidebar-form__title">Enter a new name</h1>
            <input
                className={`sidebar-form__input${
                    inputFormMessage ? ' error' : ''
                }`}
                type="text"
                placeholder="new name"
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            {inputFormMessage ? (
                <div className="form-error">{inputFormMessage}</div>
            ) : (
                ''
            )}
            <button className="sidebar-form__button" onClick={changeName}>
                Confirm
            </button>
        </div>
    );
};

export default BoardFormEdit;

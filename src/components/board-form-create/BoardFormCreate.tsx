import type { IBoard } from '../../models/IBoard';
import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { createOneCard } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { v4 as uuidv4 } from 'uuid';
import { setInputFormMessage } from '../../store/reducers/boardsSlice';

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
    const { inputFormMessage } = useAppSelector((state) => state.boardsSlice);

    const onCreateCard = () => {
        if (input.length > 35 || !input.length) {
            dispatch(setInputFormMessage('Incorrect value'));
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
        dispatch(setInputFormMessage(''));
    };

    return (
        <div className="sidebar-form">
            <h1 className="sidebar-form__title">Enter a card name</h1>
            <input
                className={`sidebar-form__input${
                    inputFormMessage ? ' error' : ''
                }`}
                placeholder="name"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            {inputFormMessage ? (
                <div className="form-error">{inputFormMessage}</div>
            ) : (
                ''
            )}
            <button className="sidebar-form__button" onClick={onCreateCard}>
                Create
            </button>
        </div>
    );
};

export default BoardFormCreate;

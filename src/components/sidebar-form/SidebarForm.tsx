import { useCreateBoardMutation } from '../../store/reducers/apiSlice';
import { v4 as uuidv4 } from 'uuid';
import { createOneBoard } from '../../store/reducers/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setInputFormMessage } from '../../store/reducers/boardsSlice';

import './sidebarform.scss';

interface ISidebarFormProps {
    setModal: (isModal: boolean) => void;
    input: string;
    setInput: (value: string) => void;
}

const SidebarForm: React.FC<ISidebarFormProps> = ({
    setModal,
    input,
    setInput,
}) => {
    const [createBoard] = useCreateBoardMutation();
    const dispatch = useAppDispatch();
    const { inputFormMessage } = useAppSelector((state) => state.boardsSlice);

    const onCreateBoard = () => {
        if (input.length > 35 || !input.length) {
            dispatch(setInputFormMessage('Incorrect value'));
            return;
        }
        const newBoard = { id: uuidv4(), title: input, cards: [] };
        createBoard(newBoard);
        dispatch(createOneBoard(newBoard));
        setModal(false);
        setInput('');
    };

    return (
        <div className="sidebar-form">
            <h1 className="sidebar-form__title">Enter a board name</h1>
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
            <button className="sidebar-form__button" onClick={onCreateBoard}>
                Create
            </button>
        </div>
    );
};

export default SidebarForm;

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEditBoardMutation } from '../../store/reducers/apiSlice';
import { setNewBoard } from '../../store/reducers/boardsSlice';
import type { ICard } from '../../models/IBoard';

interface ICardFormDeleteProps {
    setModal: (isModal: boolean) => void;
    cardId: string;
}

const CardFormDelete: React.FC<ICardFormDeleteProps> = ({
    setModal,
    cardId,
}) => {
    const { board } = useAppSelector((state) => state.cardSlice);
    const [editBoard] = useEditBoardMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDeleteCard = () => {
        const newCards =
            board.cards &&
            board.cards.filter((card: ICard) => card.id !== cardId);
        const newBoard = { ...board, cards: newCards };
        editBoard(newBoard);
        dispatch(setNewBoard(newBoard));
        setModal(false);
        navigate(-1);
    };

    return (
        <div className="board-form-delete">
            <h1 className="sidebar-form__title">Are you sure?</h1>
            <div className="board-form-delete__buttons">
                <button
                    className="board-form-delete__button"
                    onClick={() => setModal(false)}
                >
                    Cancel
                </button>
                <button
                    className="board-page__header__button"
                    onClick={onDeleteCard}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default CardFormDelete;

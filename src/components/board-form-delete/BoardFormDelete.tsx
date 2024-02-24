import { useNavigate } from "react-router-dom";
import { useDeleteBoardMutation } from "../../store/reducers/apiSlice";
import { deleteOneBoard } from "../../store/reducers/boardsSlice";
import { IBoard } from "../../models/IBoard";

import "./boardformdelete.sass";

interface IBoardFormDeleteProps {
	setModal: (isModal: boolean) => void;
	board: IBoard;
}

const BoardFormDelete: React.FC<IBoardFormDeleteProps> = ({
	setModal,
	board,
}) => {
	const [deleteBoard] = useDeleteBoardMutation();
	const navigate = useNavigate();
	const onDeleteBoard = () => {
		deleteBoard(board);
		deleteOneBoard(board.id);
		setModal(false);
		navigate("/");
	};

	return (
		<div className="board-form-delete">
			<h1 className="board-menu-form__title">Are you sure?</h1>
			<div className="board-form-delete__buttons">
				<button
					className="board-form-delete__button"
					onClick={() => setModal(false)}
				>
					Cancel
				</button>
				<button
					className="board-page__header__button"
					onClick={onDeleteBoard}
				>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default BoardFormDelete;

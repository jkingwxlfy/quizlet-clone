import { useCreateBoardMutation } from "../../store/reducers/apiSlice";
import { v4 as uuidv4 } from "uuid";
import { createOneBoard } from "../../store/reducers/boardsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setInputFormError } from "../../store/reducers/boardsSlice";

import "./sidebarform.sass";

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
	const { inputFormError } = useAppSelector((state) => state.boardsSlice);

	const onCreateBoard = () => {
		if (input.length > 35) {
			dispatch(setInputFormError(true));
			return;
		}
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
				className={`board-menu-form__input${
					inputFormError ? " error" : ""
				}`}
				placeholder="name"
				type="text"
				value={input}
				onChange={(event) => setInput(event.target.value)}
			/>
			{inputFormError ? "Max length 35" : ""}
			<button className="board-menu-form__button" onClick={onCreateBoard}>
				Create
			</button>
		</div>
	);
};

export default SidebarForm;

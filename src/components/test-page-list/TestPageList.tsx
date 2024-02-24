import { useRef } from "react";
import { useAppSelector } from "../../hooks/redux";

import TestPageListItem from "../test-page-list-item/TestPageListItem";

const TestPageList: React.FC = () => {
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const { testWords } = useAppSelector((state) => state.cardSlice);

	return (
		<>
			{testWords.map((word, key) => (
				<TestPageListItem
					key={word.id}
					word={word}
					index={key}
					inputRefs={inputRefs}
				/>
			))}
		</>
	);
};

export default TestPageList;

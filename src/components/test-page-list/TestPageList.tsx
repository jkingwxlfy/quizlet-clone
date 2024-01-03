import { ITestWord } from "../../models/ITestWord";
import { useRef } from "react";

import TestPageListItem from "../test-page-list-item/TestPageListItem";

import "./testpagelist.sass";

interface TestPageListProps {
    words: ITestWord[];
}

const TestPageList: React.FC<TestPageListProps> = ({ words }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    return (
        <>
            {words.map((word, key) => (
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

import "./testpageresult.sass";

interface TestPageResultProps {
    isShowedResults: boolean;
    rightCount: number;
    wrongCount: number;
    onRetryTest: () => void;
}

const TestPageResult: React.FC<TestPageResultProps> = ({
    isShowedResults,
    rightCount,
    wrongCount,
    onRetryTest,
}) => {
    return (
        <div
            className={`test-mode-page__results ${
                isShowedResults ? "showed" : ""
            }`}
        >
            <div>
                {rightCount > wrongCount
                    ? "Well done, keep it up!"
                    : "Don't give up, trust the process!"}
            </div>
            <div className="test-mode-page__right">
                Right answers : {rightCount}
            </div>
            <div className="test-mode-page__wrong">
                Wrong answers : {wrongCount}
            </div>
            <button className="test-mode-page__retry" onClick={onRetryTest}>
                Retry!
            </button>
        </div>
    );
};

export default TestPageResult;

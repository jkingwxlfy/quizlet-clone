import { useAppDispatch } from "../../../hooks/redux";
import { setInputFormError } from "../../../store/reducers/boardsSlice";

import "./mymodal.sass";

interface MyModalProps {
    isModal: boolean;
    setModal: (isModal: boolean) => void;
    setInput?: (value: string) => void;
    children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({
    isModal,
    setModal,
    children,
    setInput,
}) => {
    const dispatch = useAppDispatch();

    const onCloseModal = () => {
        setModal(false);
        setInput && setInput("");
        dispatch(setInputFormError(false));
    };

    const clazzWrapper = isModal ? "my-modal modal__active" : "my-modal";
    const clazzContent = isModal
        ? "my-modal__content modal__active"
        : "my-modal__content";

    return (
        <main className={clazzWrapper} onClick={onCloseModal}>
            <div
                className={clazzContent}
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </main>
    );
};

export default MyModal;

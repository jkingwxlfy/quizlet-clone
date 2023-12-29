import "./mymodal.sass";

interface MyModalProps {
    isModal: boolean;
    setModal: (isModal: boolean) => void;
    children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ isModal, setModal, children }) => {
    const clazzWrapper = isModal ? "my-modal modal__active" : "my-modal";
    const clazzContent = isModal
        ? "my-modal__content modal__active"
        : "my-modal__content";

    return (
        <main className={clazzWrapper} onClick={() => setModal(false)}>
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

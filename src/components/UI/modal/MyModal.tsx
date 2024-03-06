import { useAppDispatch } from '../../../hooks/redux';
import { setInputFormError } from '../../../store/reducers/boardsSlice';

import './mymodal.scss';

interface IMyModalProps {
    isModal: boolean;
    setModal: (isModal: boolean) => void;
    setInput?: (value: string) => void;
    children: React.ReactNode;
}

const MyModal: React.FC<IMyModalProps> = ({
    isModal,
    setModal,
    children,
    setInput,
}) => {
    const dispatch = useAppDispatch();

    const onCloseModal = () => {
        setModal(false);
        setInput && setInput('');
        dispatch(setInputFormError(false));
    };

    const clazzWrapper = isModal ? 'my-modal modal-active' : 'my-modal';
    const clazzContent = isModal
        ? 'my-modal__content modal-active'
        : 'my-modal__content';

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

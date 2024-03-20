import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { setInputFormMessage } from '../../../store/reducers/boardsSlice';

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
    };

    const clazzWrapper = isModal ? 'my-modal modal-active' : 'my-modal';
    const clazzContent = isModal
        ? 'my-modal__content modal-active'
        : 'my-modal__content';

    useEffect(() => {
        if (isModal && setInput) {
            setInput('');
            dispatch(setInputFormMessage(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModal]);

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

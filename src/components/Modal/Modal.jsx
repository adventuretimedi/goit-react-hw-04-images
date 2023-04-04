import s from './Modal.module.css';
import { useModal } from './ModalContext';
import { useEffect } from 'react';

const Modal = () => {
  const { modalImage, closeModal } = useModal();

  // handle Escape to close modal window
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return modalImage !== null ? (
    <div
      className={s.overlay}
      onClick={() => {
        closeModal();
      }}
    >
      <div className={s.modal}>
        <img src={modalImage.largeImageURL} alt={modalImage.tags} />
      </div>
    </div>
  ) : null;
};

export default Modal;

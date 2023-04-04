import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};

export default Modal;

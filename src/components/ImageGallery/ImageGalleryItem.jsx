import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { useModal } from 'components/Modal/ModalContext';

const ImageGalleryItem = ({ image }) => {
  const { showModal } = useModal();
  return (
    <li
      className={s.imageGalleryItem}
      onClick={() => {
        showModal(image);
      }}
    >
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};

export default ImageGalleryItem;

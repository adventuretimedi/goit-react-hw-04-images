import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './ImageGallery.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;
    return (
      <li className={s.imageGalleryItem} onClick={this.props.onClick}>
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;

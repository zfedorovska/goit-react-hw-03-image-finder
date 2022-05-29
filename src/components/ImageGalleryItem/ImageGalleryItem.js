import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ src, alt, largeImgUrl, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        data-largeurl={largeImgUrl}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

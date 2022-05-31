import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  render() {
    const { galleryItemsList, handleGalleryItemClick } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {galleryItemsList.map(({ webformatURL, tags, id, largeImageURL }) => (
          <ImageGalleryItem
            src={webformatURL}
            alt={tags}
            key={id}
            largeImgUrl={largeImageURL}
            onClick={handleGalleryItemClick}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  galleryItemsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleGalleryItemClick: PropTypes.func.isRequired,
};

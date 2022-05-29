import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

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

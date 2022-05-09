import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, largeImgUrl, onClick }) {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
          <img src={src} alt={alt} data-largeurl={largeImgUrl} className={s.ImageGalleryItemImage}/>
    </li>
  );
}


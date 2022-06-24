import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(({ id, imageURL, tags, src }) => (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        id={id}
        src={imageURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        name={src}
        onClick={onClick}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

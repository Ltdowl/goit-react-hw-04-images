import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(image => (
    <li key={image.id} className={s.ImageGalleryItem}>
      <img
        src={image.imageURL}
        alt={image.tags}
        className={s.ImageGalleryItemImage}
        name={image.src}
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


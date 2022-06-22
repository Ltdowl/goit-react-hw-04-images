import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <>
      <ul className={s.ImageGallery} >
        <ImageGalleryItem
          images={data}
          onClick={onClick} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};

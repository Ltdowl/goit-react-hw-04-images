import React, { useState, useEffect } from 'react';
import { Grid } from 'react-loader-spinner';
import { ServiceAPI } from '../API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import s from './ImageGallery/ImageGallery.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [pickedPicture, setPickedPicture] = useState(null);
  const [total, setTotal] = useState(0);
  
    useEffect(() => {
      if (!searchQuery) {
        return;
      }

      const getPicture = () => {
        setStatus('pending');
        ServiceAPI(searchQuery, page)
          .then(dataProcessing)
          .catch(error => {
            setError(error);
            setStatus('rejected');
          });
      };
      getPicture();
    }, [page, searchQuery]);
  
 const dataProcessing = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      setStatus('rejected');
      setError(new Error('Try to change the request'));
      return;
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    const data = dataArray.map(data => {
      const {
        id,
        largeImageURL: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    });
   setData(state => [...state, ...data]);
   setTotal(totalHits);
   setStatus('resolved');
      };

  const handleSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
      setPage(1);
      setData([]);
    }
    return;
  };

  const handleLoadMore = () => {
    setPage(state => state + 1);
  };

const toggleModal = () => {
    setShowModal(state => !state);
  };

const clickOnImage = e => {
  toggleModal();
  setPickedPicture(e.target);
  // console.log(e.target);
};

    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        {data.length > 0 && <ImageGallery data={data} onClick={clickOnImage} />}
        {status === 'resolved' && data.length > 0 && data.length < total && (
          <>
            <Button onClick={handleLoadMore} />
          </>
        )}
        {status === 'pending' && (
          <div className={s.Watch}>
            <Grid color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {status === 'rejected' && (
          <div className={s.ImageGallery}>
            <p>{`Something went wrong! ${error}`}</p>
          </div>
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={pickedPicture.src} alt={pickedPicture.tags} />
          </Modal>
        )}
      </div>
    );
        }
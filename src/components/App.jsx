import { Component } from 'react';
import { Grid } from 'react-loader-spinner';
import { ServiceAPI } from '../API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import s from './ImageGallery/ImageGallery.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    data: {},
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    pickedPicture: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', data: [], page: 1 }, this.getPicture);
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setState({ status: 'pending' }, this.getPicture);
    }
  }

  getPicture = () => {
    const { query } = this.state;
    const { page } = this.state;
    ServiceAPI(query, page)
      .then(this.dataProcessing)
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataProcessing = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      this.setState({
        status: 'rejected',
        error: new Error('Try to change the request'),
      });
      return;
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    const newData = dataArray.map(data => {
      const {
        id,
        largeImageURL: imageURL,
        webformatURL: src,
        tags: alt,
      } = data;
      return { id, imageURL, src, alt };
    });
    return this.setState(({ data }) => {
      return {
        data: [...data, ...newData],
        total: totalHits,
        status: 'resolved',
      };
    });
  };

  handleSubmit = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery });
    }
    return;
  };

  handleLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  clickOnImage = e => {
    this.setState({ showModal: true, pickedPicture: e.target });
  };

  render() {
    const { status, error, data, showModal, total, pickedPicture } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {data.length > 0 && (
          <ImageGallery data={this.state.data} onClick={this.clickOnImage} />
        )}
        {status === 'resolved' && data.length > 0 && data.length < total && (
          <>
            <Button onClick={this.handleLoadMore} />
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
          <Modal onClose={this.toggleModal}>
            <img src={pickedPicture.src} alt={pickedPicture.tags} />
          </Modal>
        )}
      </div>
    );
  }
}

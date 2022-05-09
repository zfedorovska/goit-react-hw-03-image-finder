import { Component } from 'react';
import galleryAPI from '../../services/gallery-api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import s from './ImageGallery.module.css';

const Status = {
  IDDLE: 'iddle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
      galleryItemsList: [],
      activeImageLargeUrl: '',
      error: null,
      status: Status.IDLE,
      showModal: false,
      page: 1
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevProps.searchValue;
    const nextSearchValue = this.props.searchValue;
    let nextGalleryItems = prevState.galleryItemsList;
    let nextPage = this.state.page;

    if ((prevSearchValue !== nextSearchValue) | (prevState.page !== this.state.page)) {
      this.setState({ status: Status.PENDING });
      nextPage = (prevSearchValue !== nextSearchValue) ? 1 : nextPage;
        galleryAPI
          .fetchGallery(nextSearchValue, nextPage)
          .then(response => {
            if ((prevSearchValue !== nextSearchValue) | (this.state.page === 1)) {
              nextGalleryItems = [...response.hits];
            }
            else {
              nextGalleryItems = [...prevState.galleryItemsList, ...response.hits];
            }
            this.setState({ status: Status.RESOLVED, galleryItemsList: nextGalleryItems, page: nextPage });
          })
          .catch(error => {
            this.setState({ error, status: Status.REJECTED })
          });     
    }
  };

  handleLoadMoreButton = () => {
    this.setState((state) => ({
    page: state.page + 1,
    }));
  }

  handleGalleryItemClick = (event) => {
    this.setState({
      activeImageLargeUrl: event.target.dataset.largeurl
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
    showModal: !showModal,
    }));
  };

  render() {
    const { status } = this.state;

    if (status === 'pending') {
       return <Loader />;
    }

    if (status === 'rejected') {
        return <div>No pictures are found by query</div>;
    }

    if (status === 'resolved') {
      const { galleryItemsList, showModal } = this.state;
        return (
          <div>
            <ul className={s.ImageGallery}>
              {galleryItemsList.map((item, index) => (
                <ImageGalleryItem
                  src={item.webformatURL}
                  alt={item.tags}
                  key={item.id}
                  largeImgUrl={item.largeImageURL}
                  onClick={this.handleGalleryItemClick} />
              ))}
            </ul>
            {showModal && <Modal onClose={this.toggleModal}>
              <img src={this.state.activeImageLargeUrl} alt="" />
            </Modal>}
            {galleryItemsList.length>0 && <Button onClick={this.handleLoadMoreButton}/>}
          </div>)
    }
  }
}
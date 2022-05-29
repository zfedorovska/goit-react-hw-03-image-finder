import { Component } from 'react';
import galleryAPI from 'services/gallery-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const Status = {
  IDDLE: 'iddle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchValue: '',
    galleryItemsList: [],
    activeImageLargeUrl: '',
    error: null,
    status: Status.IDLE,
    showModal: false,
    page: 1,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevState.searchValue;
    const nextSearchValue = this.state.searchValue;
    let nextGalleryItems = prevState.galleryItemsList;
    let nextPage = this.state.page;

    if (
      (prevSearchValue !== nextSearchValue) |
      (prevState.page !== this.state.page)
    ) {
      this.setState({ status: Status.PENDING });
      nextPage = prevSearchValue !== nextSearchValue ? 1 : nextPage;
      galleryAPI
        .fetchGallery(nextSearchValue, nextPage)
        .then(response => {
          if ((prevSearchValue !== nextSearchValue) | (this.state.page === 1)) {
            nextGalleryItems = [...response.hits];
          } else {
            nextGalleryItems = [
              ...prevState.galleryItemsList,
              ...response.hits,
            ];
          }
          this.setState({
            status: Status.RESOLVED,
            galleryItemsList: nextGalleryItems,
            page: nextPage,
            totalHits: response.totalHits,
          });
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }

  handleLoadMoreButton = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  handleGalleryItemClick = event => {
    this.setState({
      activeImageLargeUrl: event.target.dataset.largeurl,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { status, galleryItemsList, showModal, totalHits } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div>
          <ImageGallery
            galleryItemsList={this.state.galleryItemsList}
            handleGalleryItemClick={this.handleGalleryItemClick}
          />
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.activeImageLargeUrl} alt="" />
            </Modal>
          )}
          {totalHits > galleryItemsList.length > 0 && (
            <Button onClick={this.handleLoadMoreButton} />
          )}
        </div>
        {status === 'rejected' && <p>No pictures are found by query</p>}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}

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
  NOTFOUND: 'notFound',
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
    let nextGalleryItems =
      prevSearchValue !== nextSearchValue ? [] : prevState.galleryItemsList;
    const nextPage = this.state.page;
    if ((prevSearchValue !== nextSearchValue) | (prevState.page < nextPage)) {
      this.setState({ status: Status.PENDING });
      galleryAPI
        .fetchGallery(nextSearchValue, nextPage)
        .then(response => {
          const hits = this.mapHitsArray(response.hits);
          let actualStatus =
            hits.length === 0 && nextPage === 1
              ? Status.NOTFOUND
              : Status.RESOLVED;
          this.setState({
            status: actualStatus,
            galleryItemsList: [...nextGalleryItems, ...hits],
            totalHits: response.totalHits,
          });
        })
        .catch(error => {
          this.setState({ error, status: Status.REJECTED });
        });
    }
  }

  mapHitsArray = array => {
    return array.map(({ webformatURL, tags, id, largeImageURL }) => ({
      webformatURL,
      tags,
      id,
      largeImageURL,
    }));
  };

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
    this.setState({ searchValue, galleryItemsList: [], page: 1 });
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
        {status === 'notFound' && <p>No pictures are found by query</p>}
        {status === 'rejected' && <p>Server returns error</p>}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}

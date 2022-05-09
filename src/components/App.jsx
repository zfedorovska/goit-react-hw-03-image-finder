import { Component } from 'react';
import { nanoid } from 'nanoid';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal'

export default class App extends Component {
  state = {
    searchValue: ''
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchValue={this.state.searchValue}/>       
      </div>
    );
  }
}



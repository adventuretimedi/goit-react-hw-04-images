import { Component } from 'react';
import fetchImagesWithQuery from './Services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import s from './App.css';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    canLoadMore: false,
    isLoading: false,
    modalImage: null,
    error: null,
    term: '',
    page: 1,
  };
  // 1) Loading
  // 2) Обробку помилки
  // 3) 404 not found
  // Доки чекаємо на відповідь на HTTP-запит, показуємо індикатор завантаження
  searchImages = async term => {
    this.setState({ canLoadMore: false, isLoading: true, page: 1, term });
    console.log('searching');
    try {
      const data = await fetchImagesWithQuery(term);
      const images = data.hits;
      const maxImages = data.totalHits;
      console.log('images', images);
      this.setState({
        images,
        canLoadMore:
          images.length > 0 && images.length < maxImages ? true : false,
      });
    } catch (error) {
      console.log('error: ', error);
      this.setState({ error });
    } finally {
      console.log('finished searching');
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    const nextPage = this.state.page + 1;
    this.setState({ canLoadMore: false, isLoading: true, page: nextPage });
    console.log('PAGE', nextPage);
    try {
      const data = await fetchImagesWithQuery(this.state.term, nextPage);
      console.log(data.hits);
      const newImages = [...this.state.images, ...data.hits];
      const maxImages = data.totalHits;
      this.setState({
        images: newImages,
        canLoadMore: newImages.length < maxImages ? true : false,
      });
    } catch (error) {
      console.log('error: ', error);
      this.setState({ error });
    } finally {
      console.log('finished searching');
      this.setState({ isLoading: false });
    }
  };

  showModal = modalImage => {
    console.log('showModal: ', modalImage);
    this.setState({ modalImage });
  };

  closeModal = () => {
    console.log('close modal');
    this.setState({ modalImage: null });
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    return (
      // В методі render за умовою повертаємо розмітку.
      //  Якщо дані завантажуються, показуємо лоадер, в іншому випадку – список з результатами.
      <div className={s.App}>
        <Searchbar onSubmit={this.searchImages} />
        <ImageGallery images={this.state.images} onShowModal={this.showModal} />
        <Loader isVisible={this.state.isLoading} />
        {this.state.canLoadMore && <Button onClick={this.loadMoreImages} />}
        {this.state.modalImage && (
          <Modal image={this.state.modalImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;

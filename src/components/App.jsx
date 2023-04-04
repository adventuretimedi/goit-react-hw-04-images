import { useState } from 'react';
import { ModalProvider } from './Modal/ModalContext';
import s from './App.css';
import fetchImagesWithQuery from './Services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);

  // 1) Loading
  // 2) Обробку помилки
  // 3) 404 not found
  // Доки чекаємо на відповідь на HTTP-запит, показуємо індикатор завантаження

  const getImages = async (term, page) => {
    setCanLoadMore(false);
    setIsLoading(true);
    setPage(page);

    console.log('searching: ', term, ', page: ', page);

    try {
      const data = await fetchImagesWithQuery(term, page);
      console.log(data.hits);
      const newImages = page === 1 ? data.hits : [...images, ...data.hits];
      const maxImages = data.totalHits;
      setImages(newImages);
      setCanLoadMore(
        newImages.length > 0 && newImages.length < maxImages ? true : false
      );
    } catch (error) {
      console.log('error: ', error);
    } finally {
      console.log('finished searching');
      setIsLoading(false);
    }
  };

  const searchImages = async term => {
    setTerm(term);
    getImages(term, 1);
  };

  const loadMoreImages = async () => {
    getImages(term, page + 1);
  };

  return (
    // В методі render за умовою повертаємо розмітку.
    //  Якщо дані завантажуються, показуємо лоадер, в іншому випадку – список з результатами.
    <ModalProvider>
      <div className={s.App}>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery images={images} />
        <Loader isVisible={isLoading} />
        {canLoadMore && <Button onClick={loadMoreImages} />}
        <Modal />
      </div>
    </ModalProvider>
  );
};

export default App;

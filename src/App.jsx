/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Loader } from './components/Loader/Loader';
import { Modal } from './components/Modal/Modal';
import { Api } from 'API/Api';
import { Empty } from './components/Empty/Empty';

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = () => {
      setIsLoading(true);
      Api.fetchImages(query, page)
        .then(res => {
          setImages([...images, ...res.data.hits]);
          setTotal(res.data.total);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchImages();
  }, [page, query]);

  function isDisabled() {
    return page >= Math.ceil(total / 12);
  }

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const hasImages = images.length > 0;
  const hasLoading = isLoading && !hasImages;
  const showBtn = !isDisabled();
  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {hasImages ? (
        <ImageGallery
          onClickImage={image => setCurrent(image)}
          images={images}
        />
      ) : (
        <Empty />
      )}
      {hasLoading && <Loader />}
      {showBtn && <Button onClick={() => setPage(page + 1)} />}

      {current && <Modal onClose={() => setCurrent(null)} image={current} />}
    </div>
  );
}

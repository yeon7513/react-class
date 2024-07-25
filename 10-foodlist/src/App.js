import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import {
  addDatas,
  deleteDatas,
  getAllDatas,
  getDatasByOrderLimit,
  updateDatas,
} from './api/firebase';
import moreIcon from './assets/ic-moreview-green.png';
import searchIcon from './assets/ic-search.png';
import Container from './components/Container';
import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import SortButton from './components/SortButton';
import styles from './css/App.module.css';
import useTranslate from './hooks/useTranslate';
import Footer from './layout/Footer';
import Header from './layout/Header';

const LIMIT = 5;

function App() {
  const [foods, setFoods] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [order, setOrder] = useState('createdAt');
  const [lq, setLq] = useState();
  const [allDatas, setAllDatas] = useState([]);
  const [keyword, setKeyword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslate();

  const handleLoadAllDatas = async () => {
    const result = await getAllDatas('foods');
    setAllDatas(result);
  };

  const handleLoad = async (options) => {
    setIsLoading(true);

    const { resultData, lastQuery } = await getDatasByOrderLimit(
      'foods',
      options
    );

    if (!options.lq) {
      setFoods(resultData);
    } else {
      setFoods((prev) => [...prev, ...resultData]);
    }

    if (!lastQuery) {
      setHasNext(false);
    }
    setLq(lastQuery);
    setIsLoading(false);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      handleLoad({ order: order, limit: LIMIT });
      setHasNext(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setFoods(allDatas.filter(({ title }) => title.includes(keyword)));
    setHasNext(false);
  };

  const handleNewestClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  const handleAddSuccess = (data) => {
    setFoods((prev) => [data, ...prev]);
    handleLoad({ order: order, limit: LIMIT });
  };

  const handleUpdateSuccess = (result) => {
    setFoods((prev) => {
      const splitIdx = prev.findIndex((item) => item.id === result.id);

      return [...prev.slice(0, splitIdx), result, ...prev.slice(splitIdx + 1)];
    });
  };

  const handleDelete = async (docId, imgUrl) => {
    const result = await deleteDatas('foods', docId, imgUrl);

    if (!result) {
      alert('저장된 이미지 파일이 없습니다.');
      return false;
    }

    setFoods((prev) => prev.filter((item) => item.docId !== docId));
    handleLoad({ order: order, limit: LIMIT });
  };

  useEffect(() => {
    handleLoadAllDatas();
  }, []);

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);

  return (
    <div className={styles.App}>
      <Header />
      <Container className={styles.container}>
        <FoodForm
          selected={false}
          onSubmit={addDatas}
          handleSubmitSuccess={handleAddSuccess}
        />
        <div className={styles.sort}>
          <form className={styles.search} onSubmit={handleSearch}>
            <input
              className={styles.searchBar}
              onChange={handleKeywordChange}
            />
            <button className={styles.searchBtn}>
              <img src={searchIcon} alt="" />
            </button>
          </form>
          <div className={styles.sortBtns}>
            <SortButton
              className={order === 'createdAt' ? styles.active : ''}
              onClick={handleNewestClick}
            >
              {t('newest button')}
            </SortButton>
            <SortButton
              className={order === 'calorie' ? styles.active : ''}
              onClick={handleCalorieClick}
            >
              {t('calorie button')}
            </SortButton>
          </div>
        </div>
        {isLoading && (
          <div className={styles.loading}>
            <BeatLoader color="#4caf50" size={15} />
            <p>{t('loading wait')}</p>
          </div>
        )}
        <FoodList
          foods={foods}
          onUpdate={updateDatas}
          handleDelete={handleDelete}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button
            className={styles.moreBtn}
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            <img src={moreIcon} alt="" />
            {t('load more')}
          </button>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default App;

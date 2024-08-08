import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
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
import {
  addItem,
  deleteItem,
  loadItems,
  setOrder,
  updateItem,
} from './store/foodSlice';

const LIMIT = 5;

function App() {
  const [keyword, setKeyword] = useState();
  const t = useTranslate();

  const dispatch = useDispatch();

  const { items, lq, isLoading, order, hasNext } = useSelector(
    (state) => state.foods
  );

  const handleLoad = useCallback(
    (options) => {
      dispatch(loadItems({ collectionName: 'foods', options }));
    },
    [dispatch]
  );

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      // handleLoad({ order: order, limit: LIMIT });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // setFoods(allDatas.filter(({ title }) => title.includes(keyword)));
  };

  const handleNewestClick = () => dispatch(setOrder('createdAt'));
  const handleCalorieClick = () => dispatch(setOrder('calorie'));

  const handleMoreClick = () => {
    const options = {
      conditions: [],
      orders: [{ field: order, direction: 'desc' }],
      limits: LIMIT,
      lastQuery: lq,
    };
    handleLoad(options);
  };

  const handleUpdate = (collectionName, dataObj, docId, imgUrl) => {
    dispatch(updateItem({ collectionName, dataObj, docId, imgUrl }));
  };

  const handleUpdateSuccess = (result) => {
    console.log(result);
  };

  const handleAddSuccess = () => {
    const options = {
      conditions: [],
      orders: [{ field: order, direction: 'desc' }],
      limits: LIMIT,
      lastQuery: undefined,
    };
    handleLoad(options);
  };

  const handleAddItem = async (addObj) => {
    const params = {
      collectionName: 'foods',
      addObj: addObj,
    };
    dispatch(addItem(params));
  };

  const handleDelete = async (docId, imgUrl) => {
    const params = {
      collectionName: 'foods',
      docId,
      imgUrl,
    };
    dispatch(deleteItem(params));

    const options = {
      conditions: [],
      orders: [{ field: order, direction: 'desc' }],
      limits: LIMIT,
      lastQuery: undefined,
    };
    handleLoad(options);
  };

  useEffect(() => {
    const options = {
      conditions: [],
      orders: [{ field: order, direction: 'desc' }],
      limits: LIMIT,
      lastQuery: undefined,
    };
    handleLoad(options);
  }, [order, handleLoad]);

  return (
    <div className={styles.App}>
      <Header />
      <Container className={styles.container}>
        <FoodForm
          selected={false}
          onSubmit={handleAddItem}
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
          foods={items}
          onUpdate={handleUpdate}
          handleDelete={handleDelete}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button
            className={styles.moreBtn}
            onClick={handleMoreClick}
            disabled={isLoading}
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

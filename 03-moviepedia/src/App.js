import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import LocaleSelect from './components/LocaleSelect';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from './firebase';
import useTranslate from './hooks/useTranslate';

const LIMIT = 5;

function AppSortButton({ children, onClick, selected }) {
  let isSelected = '';
  if (selected) {
    isSelected = 'selected';
  }
  return (
    <button className={`App-sort-btn ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const t = useTranslate();

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      'movie',
      options
    );

    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prevItems) => [...prevItems, ...resultData]);
    }

    // 마지막 쿼리가 없을 경우 (초기화 안되게)
    if (!lastQuery) {
      setHasNext(false);
    }

    setLq(lastQuery);
  };

  const handleNewestClick = () => setOrder('createdAt');
  const handleBestClick = () => setOrder('rating');

  const handleMoreClick = () => {
    handleLoad({ order: order, limit: LIMIT, lq: lq });
  };

  const handleAddSuccess = (data) => {
    setItems((prevItems) => [data, ...prevItems]);
    handleLoad({ order: order, limit: LIMIT });
  };

  const handleUpdateSuccess = (result) => {
    // 화면처리 함수
    // 기존 데이터는 items에서 삭제 / 수정된 데이터는 items의 기존 위치에 추가
    setItems((prevItems) => {
      // findIndex : 조건에 맞는 첫번째 요소의 인덱스만 뽑아온다.
      const splitIdx = prevItems.findIndex((item) => item.id === result.id);

      // 전체 데이터에서 수정한 데이터의 앞과 뒤까지 풀어헤친 후
      // 수정된 데이터와 결합해 새로운 배열로 다시 반환 => 새로운 데이터를 화면에 렌더링
      return [
        ...prevItems.slice(0, splitIdx), // 0번 부터 위에서 찾은 인덱스의 전 까지
        result,
        ...prevItems.slice(splitIdx + 1), // 위에서 찾은 인덱스 부터 배열의 끝까지
      ];
    });
  };

  const handleDelete = async (docId, imgUrl) => {
    // 1. 파이어베이스에 접근해서 imgUrl을 사용해 스토리지에 있는 사진 파일 삭제
    // 2. docId를 사용해 문서 삭제
    const result = await deleteDatas('movie', docId, imgUrl);

    // db에서 삭제를 성공했을 때만 그 결과를 화면에 반영한다.
    // 그래서 firebase.js에서 boolean값을 return 으로 받아오는 것!!
    if (!result) {
      // result가 false일 경우
      alert('저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요.');
      return false;
    }

    // 3. items에서 docId가 같은 요소(객체)를 찾아서 제거
    // item.docId !== docId
    // -> 삭제 버튼을 누른 객체를 제외한 나머지만 화면에 반영한다.
    setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    handleLoad({ order: order, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order: order, limit: LIMIT });
    setHasNext(true);
  }, [order]);

  return (
    <div className="App">
      <nav>
        <div className="App-nav-container">
          <img src={logo} alt="MOVIEPEDIA" />
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-container">
        <div className="App-review-form">
          <ReviewForm
            onSubmit={addDatas}
            handleSubmitSuccess={handleAddSuccess}
          />
        </div>
        <div className="App-sort">
          <AppSortButton
            selected={order === 'createdAt'}
            onClick={handleNewestClick}
          >
            {t('newest button')}
          </AppSortButton>
          <AppSortButton
            selected={order === 'rating'}
            onClick={handleBestClick}
          >
            {t('best button')}
          </AppSortButton>
        </div>
        <div className="App-review-list">
          <ReviewList
            item={items}
            onUpdate={updateDatas}
            handleDelete={handleDelete}
            onUpdateSuccess={handleUpdateSuccess}
          />
          <button
            className="App-load-more-btn"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            {t('load more')}
          </button>
        </div>
      </div>
      <footer>
        <div className="App-footer-container">
          {t('terms of service')} | {t('privacy policy')}
        </div>
      </footer>
    </div>
  );
}

export default App;

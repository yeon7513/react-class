import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { addDatas, deleteDatas, getDatasByOrderLimit } from './firebase';

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

  const handleDelete = async (docId, imgUrl) => {
    // 1. 파이어베이스에 접근해서 imgUrl을 사용해 스토리지에 있는 사진 파일 삭제
    // 2. docId를 사용해 문서 삭제
    const result = await deleteDatas('movie', docId, imgUrl);

    // db에서 삭제를 성공했을 때만 그 결과를 화면에 반영한다.
    // 그래서 firebase.js에서 불린값을 return 으로 받아오는 것!!
    if (!result) {
      // result에 false일 경우
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
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-review-form">
          <ReviewForm addData={addDatas} handleAddSuccess={handleAddSuccess} />
        </div>
        <div className="App-sort">
          <AppSortButton
            selected={order === 'createdAt'}
            onClick={handleNewestClick}
          >
            최신순
          </AppSortButton>
          <AppSortButton
            selected={order === 'rating'}
            onClick={handleBestClick}
          >
            베스트순
          </AppSortButton>
        </div>
        <div className="App-review-list">
          <ReviewList item={items} handleDelete={handleDelete} />
          <button
            className="App-load-more-btn"
            onClick={handleMoreClick}
            disabled={!hasNext}
          >
            더보기
          </button>
        </div>
      </div>
      <footer>
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;

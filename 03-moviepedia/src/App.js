import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { getDatasByOrderLimit } from './firebase';

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
            <option value="">한국어</option>
            <option value="">English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-review-form">
          <ReviewForm />
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
          <ReviewList item={items} />
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

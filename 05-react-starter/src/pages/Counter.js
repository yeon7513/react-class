import React, { useEffect, useState } from 'react';
import '../scss/Counter.scss';

function Counter(props) {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('Text....');

  const MIN_COUNT = 0;
  const MAX_COUNT = 10;

  const handleCount = (calc) => {
    setCount((prev) => {
      const newCount = prev + calc;
      return newCount < MIN_COUNT
        ? MIN_COUNT
        : newCount > MAX_COUNT
        ? MAX_COUNT
        : newCount;
    });
  };

  const handleDisplayCount = (e) => {
    setCount(e.target.value);
  };

  useEffect(() => {
    console.log('컴포넌트가 최초 렌더링 시 실행되는 사이드 이펙트');
  }, []);

  useEffect(() => {
    console.log('카운트가 변경될 때 실행되는 사이드 이펙트');
  }, [count]);

  useEffect(() => {
    console.log('input 변경될 때 실행되는 사이드 이펙트');
  }, [inputValue]);
  return (
    <div className="container state-practice">
      <div className="counter">
        <input
          type="number"
          placeholder="Enter Number..."
          onChange={handleDisplayCount}
        />
        <div>
          <button onClick={() => handleCount(-1)}>-</button>
          <h1>{count}</h1>
          <button onClick={() => handleCount(+1)}>+</button>
        </div>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Search Here...."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <h2>입력한 내용 : {inputValue}</h2>
      </div>
    </div>
  );
}

export default Counter;

import { useState } from 'react';
import './App.css';
import Board from './Board';
import logo from './assets/logo.png';

// 함수형 컴포넌트 : 컴포넌트를 항수형으로 만든것(변수형으로도 만들 수 있다.)
// 함수형 컴포넌트를 만들때에는 함수명의 첫 글자는 반드시 대문자여야 한다.
// 함수형 컴포넌트 안에서는 JSX 문법으로 만든 리액트 엘리먼트를 리턴해줘야 한다.

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  // State
  // 던지기 버튼을 누르면 화면에서 주사위 이미지가 바뀌어야한다.
  // 바닐라 스크립트로 작성한다면 주사위 이미지마다 화면을 만들거나, 비동기로 화면에 요소를 추가, 삭제하는 코드를 작성해야 한다.
  // 리액트에서는 State 라는 것을 사용한다.
  // 이 State가 바뀔 때 마다 리액트가 알아서 화면을 새로 렌더링 해준다.

  const [myNum, setMyNum] = useState(1);
  const [otherNum, setOtherNum] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [otherGameHistory, setOtherGameHistory] = useState([]);

  const handleRollClick = () => {
    // 주사위 숫자 뽑아야한다.
    const nextMyNum = random(6);
    const nextOtherNum = random(6);

    // 기록 추가 한다.
    setGameHistory([...gameHistory, nextMyNum]);
    setOtherGameHistory([...otherGameHistory, nextOtherNum]);
  };

  const handleClearGame = () => {
    setGameHistory([]);
    setOtherGameHistory([]);
  };

  return (
    <div className="App">
      <div>
        <img src={logo} className="App-logo" alt="" />
        <h1 className="App-title">주사위게임</h1>
        <div>
          <button className="App-button blue" onClick={handleRollClick}>
            던지기
          </button>
          <button className="App-button red" onClick={handleClearGame}>
            처음부터
          </button>
        </div>
      </div>
      <div className="App-boards">
        <Board name="나" color="blue" gameHistory={gameHistory} />
        <Board name="상대" color="red" gameHistory={otherGameHistory} />
      </div>
    </div>
  );
}

export default App;

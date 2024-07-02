import { useState } from 'react';

import HandButton from './components/HandButton';
import HandIcon from './components/HandIcon';

import { compareRsp, generateRandomRsp } from './utils';

import reset from './assets/ic-reset.svg';

import './css/App.css';
import './css/handIcon.css';

function getResult(comparison) {
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [mySelect, setMySelect] = useState('rock');
  const [otherSelect, setOtherSelect] = useState('rock');
  const [result, setResult] = useState([]);
  const [bet, setBet] = useState(1);
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [isWin, setIsWin] = useState(0);

  // 배점 변경
  const handleChangeBet = (e) => {
    let num = Number(e.target.value);
    if (num > 9) {
      num %= 10;
    } else if (num < 1) {
      num = 1;
    }
    num = Math.floor(num);
    setBet(num);
  };

  // 가위바위보 선택
  const handleSelect = (myRsp) => {
    setMySelect(myRsp);
    const nextOtherRsp = generateRandomRsp();
    setOtherSelect(nextOtherRsp);
    const comparison = compareRsp(myRsp, nextOtherRsp);

    // 점수 계산
    if (comparison > 0) {
      setMyScore(myScore + bet);
    } else if (comparison < 0) {
      setOtherScore(otherScore + bet);
    }

    // 승부기록 출력
    const comparisonResult = getResult(comparison);
    setResult([...result, comparisonResult]);

    // 이긴 사람 WIN 이미지로 바꾸기
    setIsWin(comparison);
  };

  // 게임초기화
  const resetGame = () => {
    setMySelect('rock');
    setOtherSelect('rock');
    setResult([]);
    setBet(1);
    setMyScore(0);
    setOtherScore(0);
    setIsWin(0);
  };

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <img className="App-reset" src={reset} alt="" onClick={resetGame} />
      {/* 점수 */}
      <div className="App-scores">
        <div className="score">
          <div className="score-num">{myScore}</div>
          <div className="score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="score">
          <div className="score-num">{otherScore}</div>
          <div className="score-name">상대</div>
        </div>
      </div>
      <div className="box App-box">
        {/* 가위바위보 내는 곳 */}
        <div className="App-hands">
          <div className={`hand ${isWin > 0 ? 'winner' : ''}`}>
            <HandIcon className="hand-icon" rsp={mySelect} />
          </div>
          <div className="App-versus">vs</div>
          <div className={`hand ${isWin < 0 ? 'winner' : ''}`}>
            <HandIcon className="hand-icon" rsp={otherSelect} />
          </div>
        </div>
        {/* 배점 */}
        <div className="App-bet">
          <span>배점</span>
          <input
            type="number"
            min={1}
            max={9}
            value={bet}
            onChange={handleChangeBet}
            autoComplete="off"
          />
          <span>배</span>
        </div>
        {/* 기록 */}
        <div className="App-history">
          <h2>승부기록</h2>
          <p>{result.join(', ')}</p>
        </div>
      </div>
      {/* 가위바위보 버튼 */}
      <div className="btn-wrap">
        <HandButton rsp="rock" select={handleSelect} />
        <HandButton rsp="scissor" select={handleSelect} />
        <HandButton rsp="paper" select={handleSelect} />
      </div>
    </div>
  );
}

export default App;

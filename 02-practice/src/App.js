import './App.css';

import { useState } from 'react';
import rock from './assets/rock.svg';
import scissor from './assets/scissor.svg';
import paper from './assets/paper.svg';

import Board from './components/Board';
import Score from './components/Score';
import Rsp from './components/Rsp';

const choices = {
  rock: {
    name: 'rock',
    img: rock,
  },
  scissor: {
    name: 'scissor',
    img: scissor,
  },
  paper: {
    name: 'paper',
    img: paper,
  },
};

function App() {
  const [myChoice, setMyChoice] = useState('');
  const [otherChoice, setOtherChoice] = useState('');
  const [isWinner, setIsWinner] = useState(false);
  const [result, setResult] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);

  // 상대의 가위바위보 (랜덤)
  const randomOtherChoice = () => {
    const randomChoice =
      Object.keys(choices)[
        Math.floor(Math.random() * Object.keys(choices).length)
      ];
    setOtherChoice(randomChoice);
    return randomChoice;
  };

  // 가위바위보 선택 핸들러
  const handleMyChoice = (choice) => {
    setMyChoice(choice);
    const otherchoice = randomOtherChoice();
    comparisonResults(choice, otherchoice);
  };

  const comparisonResults = (my, other) => {
    if (my === other) {
      setIsWinner(false);
      setResult([...result, '무승부']);
    } else if (
      (my === 'rock' && other === 'scissor') ||
      (my === 'scissor' && other === 'paper') ||
      (my === 'paper' && other === 'rock')
    ) {
      setIsWinner(true);
      setMyScore(myScore + 1);
      setResult([...result, '승리']);
    } else {
      setOtherScore(otherScore + 1);
      setIsWinner(false);
      setResult([...result, '패배']);
    }
  };

  return (
    <div id="wrapper">
      <div className="container">
        <div className="header">
          <h1>가위바위보</h1>
          <button>
            <img src={require('./assets/ic-reset.svg').default} alt="" />
          </button>
        </div>
        <div className="score-panel">
          <Score name="나" score={myScore} />
          <div className="division">
            <span></span>
            <span></span>
          </div>
          <Score name="상대" score={otherScore} />
        </div>
        <div className="rsp-wrap">
          <Rsp choice={myChoice} item={choices} isWinner={isWinner} />
          <span>vs</span>
          <Rsp choice={otherChoice} item={choices} isWinner={isWinner} />
        </div>
        <Board result={result} />
        <div className="my-choice">
          <button className="btn choice" onClick={() => handleMyChoice('rock')}>
            <img
              src={require('./assets/rock.svg').default}
              alt=""
              className="my-rsp"
            />
          </button>
          <button
            className="btn choice"
            onClick={() => handleMyChoice('scissor')}
          >
            <img
              src={require('./assets/scissor.svg').default}
              alt=""
              className="my-rsp"
            />
          </button>
          <button
            className="btn choice"
            onClick={() => handleMyChoice('paper')}
          >
            <img
              src={require('./assets/paper.svg').default}
              alt=""
              className="my-rsp"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

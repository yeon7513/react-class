import { useEffect, useState } from 'react';
import './App.css';
import { getDatas } from './firebase';

function App() {
  const [mbtiInfo, setMbtiInfo] = useState([]);

  async function getMbti() {
    const snapshot = await getDatas('mbtiColor');
    const mbtiList = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      mbtiList.push(data);
    });
    setMbtiInfo(mbtiList);
  }

  useEffect(() => {
    console.log(mbtiInfo);
    getMbti();
  }, []);

  return (
    <div className="App">
      <div>
        {mbtiInfo.map((info, idx) => {
          return (
            <div key={idx}>
              <p>{info.mbti}</p>
              <span style={{ backgroundColor: info.code }}>{info.code}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

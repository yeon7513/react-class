import { useEffect } from 'react';
import './App.css';
import { getDatas } from './firebase';

function App() {
  async function getTest() {
    try {
      const snapshot = await getDatas('test');
      snapshot.forEach((doc) => {
        const data = doc.data();

        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTest();
  }, []);

  return <div className="App"></div>;
}

export default App;

import { Route, Routes } from 'react-router-dom';
import MbtiColors from './components/MbtiColors';
import NewColor from './components/NewColor';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<MbtiColors />} />
        <Route path="/newColor" element={<NewColor />} />
      </Routes>
    </div>
  );
}

export default App;

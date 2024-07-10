import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CleanUp from './pages/CleanUp';
import Counter from './pages/Counter';
import Home from './pages/Home';
import MovieApp from './pages/MovieApp';
import TodoList from './pages/TodoList';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/cleanup" element={<CleanUp />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/movie-app" element={<MovieApp />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { ThemeChangeProvider } from './context/ThemeContext';
import AboutPage from './pages/AboutPage';
import MainPage from './pages/MainPage';
import { GlobalStyles } from './theme/GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <ThemeChangeProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<MainPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </ThemeChangeProvider>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HelloStyled from './components/01/HelloStyled';
import Nesting from './components/02/Nesting';
import { Practice as Practice01 } from './components/03/Practice';
import DynamicStyling from './components/04/DynamicStyling';
import { Practice as Practice02 } from './components/05/Practice';
import Inheritance from './components/06/Inheritance';
import Reuse from './components/07/Reuse';
import { Practice as Practice03 } from './components/08/Practice';
import Login from './components/09/Login';
import App from './components/App';

function Main(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="01" element={<HelloStyled />} />
          <Route path="02" element={<Nesting />} />
          <Route path="03" element={<Practice01 />} />
          <Route path="04" element={<DynamicStyling />} />
          <Route path="05" element={<Practice02 />} />
          <Route path="06" element={<Inheritance />} />
          <Route path="07" element={<Reuse />} />
          <Route path="08" element={<Practice03 />} />
          <Route path="09" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

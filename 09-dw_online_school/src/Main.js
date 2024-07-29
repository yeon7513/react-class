import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import Logout from './components/Logout';
import CourseListPage from './pages/CourseListPage';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import QuestionListPage from './pages/QuestionListPage';
import QuestionPage from './pages/QuestionPage';
import WishListPage from './pages/WishListPage';

function Main() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="questions">
            <Route index element={<QuestionListPage />} />
            <Route path=":questionId" element={<QuestionPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/wishlist" element={<WishListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

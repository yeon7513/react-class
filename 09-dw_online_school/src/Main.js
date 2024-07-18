import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import CourseListPage from './pages/CourseListPage';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';
import QuestionListPage from './pages/QuestionListPage';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            <Route path=":courseSlug" element={<CoursePage />} />
          </Route>
          <Route path="questions" element={<QuestionListPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

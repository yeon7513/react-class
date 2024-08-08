import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from './components/Button';

function Main({ auth }) {
  // const { auth } = useContext(DiaryStateContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      auth.signOut();
      navigate('/');
    }
  };

  return (
    <div className="Main">
      <Button
        text={auth?.currentUser ? '로그아웃' : '로그인'}
        type={auth?.currentUser ? 'negative' : 'default'}
        className={'loginBtn'}
        onClick={auth?.currentUser ? handleLogout : () => navigate('/login')}
      />
      <Outlet />
    </div>
  );
}

export default Main;

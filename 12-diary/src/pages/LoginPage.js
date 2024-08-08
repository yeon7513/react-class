import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import * as FcIcons from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import styles from '../css/Login.module.css';

function LoginPage({ auth }) {
  // const { auth } = useContext(DiaryStateContext);

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // 로그인이 다 끝난 후
    await signInWithPopup(auth, provider);
    // 메인으로 이동
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.loginWrapper}>
      <button onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>Continue With Google</span>
      </button>
    </div>
  );
}

export default LoginPage;

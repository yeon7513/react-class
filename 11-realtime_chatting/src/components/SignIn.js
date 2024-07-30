import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import * as FcIcons from 'react-icons/fc';
import styles from '../css/SignIn.module.css';

function SignIn({ auth }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const loginResult = await signInWithPopup(auth, provider);
    console.log(loginResult);
  };

  return (
    <>
      <button className={styles.signIn} onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>구글로 로그인하기</span>
      </button>
      <span className={styles.notice}>
        🐱 아이폰(ios)은 safari, chrome <br />
        등으로 로그인 해주세요. 🙏
      </span>
    </>
  );
}

export default SignIn;

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../api/firebase';
import Form from '../../../components/form/Form';
import { syncCartAndStorage } from '../../../store/cart/cartSlice';
import { setUser } from '../../../store/user/userSlice';

function SignIn() {
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

      dispatch(syncCartAndStorage({ uid: user.uid, cartItems }));

      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );

      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      setFirebaseError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <Form
      title={'로그인'}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignIn;

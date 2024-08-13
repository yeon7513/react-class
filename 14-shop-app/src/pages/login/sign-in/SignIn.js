import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCart, getUserAuth } from '../../../api/firebase';
import Form from '../../../components/form/Form';
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

      await asyncCart(user.uid, cartItems);

      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );

      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      setFirebaseError('');
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

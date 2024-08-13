import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCart, getUserAuth, joinUser } from '../../../api/firebase';
import Form from '../../../components/form/Form';
import { setUser } from '../../../store/user/userSlice';

function SignUp() {
  const [firebaseError, setFirebaseError] = useState('');
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userCredential);
      const { user } = userCredential;
      // 장바구니와 유저의 정보를 저장
      // => 로컬스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

      // docId => user의 uid, user의 email 저장
      await joinUser(user.uid, user.email);

      // 장바구니 아이템 등록
      await asyncCart(user.uid, cartItems);

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
      title={'회원가입'}
      getDataForm={handleSignupAndLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignUp;

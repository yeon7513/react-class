import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import * as FaIcons from 'react-icons/fa';
import { addDatas, getQuery } from '../api/firebase';
import styles from '../css/ChatRoom.module.css';
import ChatMessage from './ChatMessage';

function ChatRoom({ auth }) {
  const [inputValue, setInputValue] = useState('');
  // const [message, setMessage] = useState([]);
  const conditions = [];
  const orders = [{ field: 'createdAt', direction: 'asc' }];
  const LIMITS = 100;
  const q = getQuery('messages', { conditions, orders, limits: LIMITS });
  const [message] = useCollectionData(q);
  const dummy = useRef();

  // const handleMessagesLoad = async () => {
  //   await getDatas('messages', setMessage);
  // };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth?.currentUser;

    // auth의 currentUser 안에는 uid와 photoUrl이 있다.
    // => 내가 임의로 지정한 것이 아니라 원래 안에 내장되어 있는 데이터임!!

    // 저장할 데이터 객체를 생성한다. (text, createdAt, photoUrl, uid)
    // => 파이어 베이스에 저장할 객체
    const addObj = {
      text: inputValue,
      createdAt: serverTimestamp(),
      // serverTimestamp() : 0000년 00월 00일 00시 00분 00초 형식으로 출력됨.
      // => 파이어 베이스에 내장되어 있는 함수
      uid: uid,
      photoURL: photoURL,
    };

    // 데이터베이스에 추가(저장)
    await addDatas('messages', addObj);

    // inputValue를 빈 문자열로 세팅
    setInputValue('');
  };

  // useEffect(() => {
  //   handleMessagesLoad();

  //   return () => {
  //     handleMessagesLoad();
  //   };
  // }, []);

  useEffect(() => {
    // scrollIntoView() 함수는 자신이 호출된 요소가 사용자에게 표시되도록 상위 컨테이너를 스크롤한다.
    // ** 크롬 설정 되어있어야함.
    // chrome://flags/#smooth-scrolling 에서 설정하기!!
    dummy.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [message]);

  return (
    <>
      <main className={styles.main}>
        {message?.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} auth={auth} />
        ))}
        <span ref={dummy}></span>
      </main>
      <form className={styles.form} onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        ></input>
        <button type="submit" disabled={!inputValue}>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import styles from '../css/ChatRoom.module.css';

function ChatRoom(props) {
  return (
    <>
      <main className={styles.main}>
        <div>
          <img src="" alt="" />
          <p>채팅 내용</p>
        </div>
      </main>
      <form className={styles.form}>
        <textarea></textarea>
        <button>
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;

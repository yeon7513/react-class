import cn from 'classnames';
import React from 'react';
import styles from '../css/ChatMessage.module.css';

function ChatMessage({ message, auth }) {
  const { uid, photoURL, text } = message;

  const messageClassName =
    uid === auth?.currentUser.uid ? styles.sent : styles.received;

  return (
    <>
      <div className={cn(styles.message, messageClassName)}>
        <img src={photoURL} alt="" />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;

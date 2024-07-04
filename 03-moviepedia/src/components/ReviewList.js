import React from 'react';
import '../css/reviewList.css';
import Rating from './Rating';

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item }) {
  return (
    <div className="list-item">
      <img className="list-item-img" src={item.imgUrl} alt={item.title} />
      <div className="list-item-rows">
        <h1 className="list-item-title">{item.title}</h1>
        <Rating className="list-item-rating" />
        <p className="list-item-date">{formatData(item.createdAt)}</p>
        <p className="list-item-content">{item.content}</p>
        <div className="list-item-btns">
          <button className="list-item-edit-btn">수정</button>
          <button className="list-item-delete-btn">삭제</button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ item }) {
  return (
    <ul className="review-list">
      {item.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;

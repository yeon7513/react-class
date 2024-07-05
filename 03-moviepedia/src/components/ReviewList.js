import React from 'react';
import '../css/reviewList.css';
import Rating from './Rating';

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, handleDelete }) {
  const handleDeleteClick = () => {
    handleDelete(item.docId, item.imgUrl);
  };

  const { imgUrl, title, rating, createdAt, content } = item;

  return (
    <div className="list-item">
      <img className="list-item-img" src={imgUrl} alt={title} />
      <div className="list-item-rows">
        <h1 className="list-item-title">{title}</h1>
        <Rating hoverRating={rating} />
        <p className="list-item-date">{formatData(createdAt)}</p>
        <p className="list-item-content">{content}</p>
        <div className="list-item-btns">
          <button className="list-item-edit-btn">수정</button>
          <button className="list-item-delete-btn" onClick={handleDeleteClick}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ item, handleDelete }) {
  return (
    <ul className="review-list">
      {item.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} handleDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;

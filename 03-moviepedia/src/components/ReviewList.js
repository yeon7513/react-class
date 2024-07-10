import React, { useState } from 'react';
import '../css/reviewList.css';
import useTranslate from '../hooks/useTranslate';
import Rating from './Rating';
import ReviewForm from './ReviewForm';

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, handleDelete, handleEdit }) {
  const { id, docId, imgUrl, title, rating, createdAt, content } = item;
  const t = useTranslate();

  const handleDeleteClick = () => {
    handleDelete(docId, imgUrl);
  };

  const handleEditClick = () => {
    handleEdit(id);
  };

  return (
    <div className="list-item">
      <img className="list-item-img" src={imgUrl} alt={title} />
      <div className="list-item-rows">
        <h1 className="list-item-title">{title}</h1>
        <Rating hoverRating={rating} />
        <p className="list-item-date">{formatData(createdAt)}</p>
        <p className="list-item-content">{content}</p>
        <div className="list-item-btns">
          <button className="list-item-edit-btn" onClick={handleEditClick}>
            {t('edit button')}
          </button>
          <button className="list-item-delete-btn" onClick={handleDeleteClick}>
            {t('delete button')}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ item, handleDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="review-list">
      {item.map((item) => {
        const { title, rating, content, imgUrl, docId } = item;
        const initialValues = { title, rating, content, imgUrl: null };

        const handleSubmit = (collectionName, dataObj) => {
          const result = onUpdate(collectionName, dataObj, docId);
          return result;
        };

        const handleSubmitSuccess = (result) => {
          onUpdateSuccess(result);
          setEditingId(null);
        };

        if (item.id === editingId) {
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                handleCancel={setEditingId}
                onSubmit={handleSubmit}
                handleSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              handleDelete={handleDelete}
              handleEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;

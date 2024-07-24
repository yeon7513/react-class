import React, { useState } from 'react';
import styles from '../css/FoodList.module.css';
import FoodForm from './FoodForm';
import FoodListItem from './FoodListItem';

function FoodList({ foods, onUpdate, handleDelete, onUpdateSuccess }) {
  const [editId, setEditId] = useState(null);

  return (
    <ul className={styles.foodList}>
      {foods.map((food) => {
        const { title, content, imgUrl, docId, calorie } = food;
        const initialValues = { title, content, imgUrl: null, calorie };

        const handleSubmit = (collectionName, dataObj) => {
          const result = onUpdate(collectionName, dataObj, docId);
          return result;
        };

        const handleSubmitSuccess = (result) => {
          onUpdateSuccess(result);
          setEditId(null);
        };

        if (food.id === editId) {
          return (
            <li key={food.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                handleCancel={setEditId}
                onSubmit={handleSubmit}
                handleSubmitSuccess={handleSubmitSuccess}
                selected={true}
              />
            </li>
          );
        }

        return (
          <FoodListItem
            key={food.id}
            food={food}
            handleDelete={handleDelete}
            handleEdit={setEditId}
          />
        );
      })}
    </ul>
  );
}

export default FoodList;

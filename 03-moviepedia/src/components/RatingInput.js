import React, { useState } from 'react';
import Rating from './Rating';

function RatingInput({ name, setRating, values }) {
  // ratingValue State는 별을 색칠하는 용도이다.
  const [ratingValue, setRatingValue] = useState(values);

  // 실제 values.rating을 바꾸는 함수는 setRating이고,
  // 이 함수를 실행하는 시기는 Star 컴포넌트의 onClick 시점이다.
  const handleSelect = (nextValue) => {
    setRating(name, nextValue);
  };

  // 점수 고정
  const handleMouseOut = () => {
    setRatingValue(values);
  };

  return (
    <div>
      <Rating
        selectRating={handleSelect}
        hoverRating={ratingValue}
        onHover={setRatingValue}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
}

export default RatingInput;

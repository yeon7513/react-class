import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../css/rating.css';

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selectRating, rating, selected, onHover }) {
  const className = `rating-star ${selected ? 'selected' : ''}`;

  // ReviewList의 별점은 고정된 상태이기 때문에 이벤트가 걸리면 안된다.
  // ReviewList 부분의 별점 처리를 위해 삼항연산자로 바꿔준다.
  const handleClick = selectRating ? () => selectRating(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      <FontAwesomeIcon icon={faStar} />
    </span>
  );
}

function Rating({ selectRating, hoverRating, onHover, onMouseOut }) {
  return (
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selectRating={selectRating}
          rating={arrNum}
          selected={hoverRating >= arrNum}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;

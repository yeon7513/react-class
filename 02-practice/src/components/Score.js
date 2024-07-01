import React from 'react';

function Score({ score, name }) {
  return (
    <div className="score">
      <h2>{score}</h2>
      <span>{name}</span>
    </div>
  );
}

export default Score;

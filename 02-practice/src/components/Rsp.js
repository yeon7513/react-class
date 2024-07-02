import React from 'react';

function Rsp({ choice, item, isWinner = false }) {
  const selectedChoice = choice || 'rock';

  console.log(isWinner);
  return (
    <div className="rsp-box">
      <div className="rsp-content">
        <div className={`choice rsp ${isWinner === true ? 'winner' : ''}`}>
          {item[selectedChoice] ? (
            <img src={item[selectedChoice].img} alt={selectedChoice} />
          ) : (
            <p>이미지를 찾을 수 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rsp;

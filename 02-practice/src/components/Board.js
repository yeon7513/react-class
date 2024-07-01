import React from 'react';

function Board({ result }) {
  return (
    <div className="board">
      <div>
        배점 <input type="number" />배
      </div>
      <div className="match-record">
        <h3>승부기록</h3>
        <p>{result.join(', ')}</p>
      </div>
    </div>
  );
}

export default Board;

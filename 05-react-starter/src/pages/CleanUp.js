import React, { useEffect, useState } from 'react';

function Hello() {
  function effectFn() {
    console.log(' created :) ');
    return destroyedFn;
  }

  function destroyedFn() {
    console.log(' destroyed :( ');
  }

  // useEffect(() => {
  //   console.log(' created :) ');
  //   return () => console.log(' destroyed :( ');
  // }, []);

  // 이렇게 써도 된다~
  useEffect(effectFn, []);

  return <h1>Hello</h1>;
}

function CleanUp() {
  const [isShowing, setIsShowing] = useState(false);

  const handleClick = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div className="cleanup">
      <button onClick={handleClick}>{isShowing ? 'Hide' : 'Show'}</button>
      {isShowing && <Hello />}
    </div>
  );
}

export default CleanUp;

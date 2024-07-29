// 비동기 통신의 결과를 기다려주는 역할을 하는 함수를 만들어
// 커스텀 훅으로 관리한다.

import { useState } from 'react';

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // wrappedFunction이 하는 역할?
  // => 비동기 통신
  const wrappedFunction = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}

export default useAsync;

import { createContext, useContext, useState } from 'react';

// Context API
// 전역으로 상태를 관리하기 위해 사용하는 기능
// 간단한 상태 관리를 제공 => 복잡한 상태 관리는 Redux 같은 라이브러리를 사용한다.
// 컴포넌트 트리에 대한 데이터를 손쉽게 공유할 수 있다.
// => 계층 구조에 전달할 필요없이 모든 레벨에서 데이터를 접근하고 사용할 수 있다.

// context가 제공할 기본값을 만든다.
export const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaultValue);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// 매번 useContext와 LocaleContext값을 가지고 사용하는 것이 번거롭기 때문에
// 이것들을 대신할 수 있는 커스텀 Hook을 만든다.
// useLocale Hook은 locale 값을 전달해주고,
// useSetLocale 이라는 Hook은 setLocale 함수를 전달해주도록 한다.

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    // throw new Error() : 에러를 만듦.
    throw new Error('반드시 LocaleProvider안에서 사용해야 합니다.');
  }
  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    // throw new Error() : 에러를 만듦.
    throw new Error('반드시 LocaleProvider안에서 사용해야 합니다.');
  }
  return context.setLocale;
}

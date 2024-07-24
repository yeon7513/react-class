import { createContext, useContext, useState } from 'react';

export const LocaleContext = createContext();

export function LocaleProvider({ defaultValue = 'ko', children }) {
  const [locale, setLocale] = useState(defaultValue);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('Error');
  }

  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('Error');
  }

  return context.setLocale;
}

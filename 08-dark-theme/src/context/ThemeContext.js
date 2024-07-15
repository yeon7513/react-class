import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { getSunsetRiseData } from '../api/getLocationData';
import { darkTheme, lightTheme } from '../theme/theme';
import { getTimes } from '../utils/getDateData';

const ThemeContext = createContext();

// ThemeChangeProvider
// => 전체적인 스타일을 변경하는 함수 (context로 사용)
function ThemeChangeProvider({ children }) {
  // 시간별로 바뀌는 모드를 작성하려면?
  // => 일몰시간을 불러오는 API를 사용해 결과값을 가지고 조건문으로 테마를 바꾼다.
  const [locationData, setLocationData] = useState({});

  // 로컬 스토리지에 테마 모드를 저장 후 불러온다.
  // => 새로고침 해도 설정한 테마가 유지된다.
  const modes = localStorage.getItem('mode') || 'light';
  const [themeMode, setThemeMode] = useState(modes);
  const themeObj = themeMode === 'light' ? lightTheme : darkTheme;

  const handleLoad = async () => {
    const data = await getSunsetRiseData();
    const { sunset, sunrise } = data;
    const currentTime = getTimes();
    // light theme
    if (
      currentTime > Number(sunrise.trim()) &&
      currentTime < Number(sunset.trim())
    ) {
      setThemeMode('light');
    } else {
      setThemeMode('dark');
    }
    setLocationData(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObj}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

// 버튼에서 사용하기 위해 커스텀 훅을 만든다.
function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;

  const toggleTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('light');
    }
  };

  // useTheme 훅을 사용하면, themeMode와 toggleTheme함수를 불러와 사용할 수 있음.
  return [themeMode, toggleTheme];
}

export { ThemeChangeProvider, useTheme };

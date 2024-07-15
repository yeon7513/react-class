import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// createGlobalStyle : 전역으로 스타일을 관리
export const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    font-family: 'S-CoreDream-3Light', 'Pretendard', sans-serif;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }
`;

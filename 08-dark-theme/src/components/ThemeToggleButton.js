import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.button`
  position: fixed;
  bottom: 4%;
  right: 3%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  font-size: 20px;
  border: ${({ theme }) => theme.borderColor};
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: ${({ theme }) =>
    theme === 'light'
      ? `0 5px 10px 0 rgba(100, 100, 100, 0.15), 0 2px 4px 0 rgba(100, 100, 100, 0.15)`
      : `0 5px 10px 0 rgba(40, 40, 40, 1), 0 2px 4px 0 rgba(40, 40, 40, 1);`};
  cursor: pointer;
`;

function ThemeToggleButton({ mode, toggleTheme }) {
  // 새로고침 후에도 테마 모드를 유지하기 위해 로컬 스토리지에 저장
  localStorage.setItem('mode', mode);

  return (
    <ToggleWrapper theme={mode} onClick={toggleTheme}>
      {mode === 'light' ? '🌝' : '🌚'}
    </ToggleWrapper>
  );
}

export default ThemeToggleButton;

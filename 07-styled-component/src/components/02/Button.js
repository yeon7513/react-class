import React from 'react';
import styled from 'styled-components';
import nail from '../../assets/nail.png';

const Icon = styled.img.attrs((props) => ({ src: props.$src }))`
  width: 24px;
  transition: 0.3s;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 24px;
  font-size: 20px;
  color: #fff;
  background-color: #6750a4;
  transition: 0.3s;
  &:hover {
    background-color: #402e7a;
    img {
      opacity: 0.5;
    }
  }
`;

function Button({ children }) {
  return (
    <StyledButton>
      <Icon $src={nail} />
      {children}
    </StyledButton>
  );
}

export default Button;

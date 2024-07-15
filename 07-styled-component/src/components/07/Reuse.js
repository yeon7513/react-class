import React from 'react';
import styled, { css } from 'styled-components';

const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
};

const fontSize = css`
  font-size: ${({ $size }) => SIZES[$size] ?? SIZES['medium']}px;
`;

const Button = styled.button`
  padding: 16px;
  border: none;
  background-color: #6750a4;
  color: #fff;
  transition: 0.3s;
  ${fontSize}
`;

const Input = styled.input`
  display: block;
  padding: 8px;
  border: 2px solid #eee;
  border-radius: 4px;
  transition: 0.3s;
  ${fontSize}
`;

const Container = styled.div`
  ${Button}, ${Input} {
    margin: 10px;
  }
`;

function Reuse() {
  return (
    <Container>
      <h2>Button</h2>
      <Button $size="small">small</Button>
      <Button $size="medium">medium</Button>
      <Button $size="large">large</Button>
      <h2>Input</h2>
      <Input $size="small" />
      <Input $size="medium" />
      <Input $size="large" />
    </Container>
  );
}

export default Reuse;

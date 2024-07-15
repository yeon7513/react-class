import styled from 'styled-components';

const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
};

const Input = styled.input`
  display: block;
  padding: ${({ $round }) => ($round ? '16px 24px' : '8px')};
  font-size: ${({ $size }) => SIZES[$size] ?? SIZES['medium']}px;
  border: 2px solid ${({ $error }) => ($error ? '#f44336' : '#eee')};
  border-radius: ${({ $round }) => ($round ? '9999px' : '5px')};
  transition: 0.3s;
  &:focus {
    border-color: ${({ $error }) => ($error ? '#f44336' : '#7760b4')};
  }
`;

export default Input;

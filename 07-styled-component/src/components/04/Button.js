import styled from 'styled-components';

const SIZES = {
  small: 16,
  medium: 20,
  large: 24,
};

export const Button = styled.button`
  padding: 16px;
  font-size: ${({ $size }) => SIZES[$size] ?? SIZES['medium']}px;
  border: none;
  border-radius: ${({ $round }) => ($round ? '9999px' : '3px')};
  background-color: #6750a4;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background-color: #463770;
  }
`;

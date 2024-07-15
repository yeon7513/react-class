import styled from 'styled-components';

const Input = styled.input`
  display: block;
  padding: ${({ $round }) => ($round ? '16px 24px' : '8px')};
  font-size: 20px;
  border: 2px solid #eee;
  border-radius: 5px;
  transition: 0.3s;
  &:focus {
    border-color: #7760b4;
  }
`;

export default Input;

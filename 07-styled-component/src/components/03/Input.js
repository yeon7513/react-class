import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({ id: props.$id }))`
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 4px;
  transition: 0.3s;
  &:focus {
    border-color: #7760b4;
  }
`;

export default Input;

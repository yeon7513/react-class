import styled from 'styled-components';

const Input = styled.input.attrs({ required: true })`
  padding: 10px;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: orange;
  color: #fff;
  transition: 0.5s;
  &:focus {
    background-color: rgba(255, 165, 0, 0.8);
  }
`;

export default Input;

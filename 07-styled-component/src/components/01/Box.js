import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.$bgColor};
  span {
    padding: 16px;
    font-size: 24px;
    border-radius: 50%;
    background-color: #000;
    transition: 0.3s;
    &::after {
      content: '🥰';
    }
    &:hover {
      background-color: #fff;
      &::after {
        content: '😘';
      }
    }
  }
`;

export default Box;

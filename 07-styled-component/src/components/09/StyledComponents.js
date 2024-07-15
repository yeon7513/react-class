import styled from 'styled-components';

export const Button = styled.button`
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background-color: ${({ $kakao }) => ($kakao ? '#FFDE4D' : '#6500c3')};
  color: ${({ $kakao }) => ($kakao ? '#333' : '#fff')};
  transition: 0.3s;
  &:hover {
    background-color: ${({ $kakao }) => ($kakao ? '#F4CE14' : '#7760b4')};
  }
`;

export const Input = styled.input.attrs(({ $id }) => ({ id: $id }))`
  padding: 8px 0;
  border-bottom: 2px solid #eee;
  transition: 0.3s;
  &:focus {
    border-color: #6500c3;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 450px;
  h2 {
    font-size: 32px;
    color: transparent;
    background: linear-gradient(45deg, royalblue 0%, #7760b4 50%, #6500c3 100%);
    background-clip: text;
  }
  span {
    font-size: 14px;
    a {
      font-weight: 600;
      text-decoration: underline;
      color: #6500c3;
      transition: 0.3s;
      &:hover {
        color: #7760b4;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 16px;
  label {
    font-size: 14px;
    opacity: 0.8;
  }
  & ${Input} {
    display: block;
    margin-bottom: 16px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  & ${Button} {
    display: block;
    margin-bottom: 8px;
    width: 100%;
    svg {
      margin-right: 8px;
    }
  }
`;

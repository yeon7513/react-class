import styled from 'styled-components';

export const LoginButton = styled.button`
  margin-top: ${({ $kakao }) => ($kakao ? 0 : '32px')};
  padding: 16px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: ${({ $kakao }) => ($kakao ? '#FFDE4D' : '#6500c3')};
  color: ${({ $kakao }) => ($kakao ? '#333' : '#fff')};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ $kakao }) => ($kakao ? '#F4CE14' : '#7760b4')};
  }
`;

export const Input = styled.input.attrs(({ $id }) => ({ id: $id }))`
  padding: 8px 0;
  border: 0;
  outline: 0;
  border-bottom: 2px solid #eee;
  transition: 0.3s;
  &:focus {
    border-color: #6500c3;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  margin: 80px auto 0;
  padding: 32px;
  width: 450px;
  box-shadow: var(--box-shadow);
  background-color: #fff;
  h2 {
    font-size: 32px;
    font-weight: 600;
    color: transparent;
    background: linear-gradient(45deg, royalblue 0%, #7760b4 50%, #6500c3 100%);
    background-clip: text;
  }
  span {
    font-size: 14px;
    a {
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
    margin: 8px 0 16px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  & ${LoginButton} {
    display: block;
    margin-bottom: 8px;
    width: 100%;
    svg {
      margin-right: 8px;
    }
  }
`;

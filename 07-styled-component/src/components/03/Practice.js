import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Container = styled.div`
  padding: 32px 48px;
  width: 400px;
  border: 1px dashed #ddd;
  h2 {
    margin-bottom: 16px;
  }
  & ${Input} {
    display: block;
    margin: 4px 0 12px;
    width: 100%;
  }
`;

function Practice() {
  return (
    <Container>
      <h2>로그인</h2>
      <label htmlFor="email">Email</label>
      <Input $id="email" type="email" placeholder="이메일" autoComplete="off" />
      <label htmlFor="pw">Password</label>
      <Input $id="pw" type="password" placeholder="비밀번호" />
    </Container>
  );
}

export { Practice };

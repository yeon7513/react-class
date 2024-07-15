import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Content, Input } from './StyledComponents';

function Login() {
  return (
    <Container>
      <h2>DW온라인스쿨 로그인</h2>
      <span>
        회원이 아니신가요? <Link to="#">회원가입 하기</Link>
      </span>
      <Content as="form">
        <label htmlFor="email">이메일</label>
        <Input
          $id="email"
          type="email"
          placeholder="example@DWOS.com"
          autoComplete="off"
        />
        <label htmlFor="pw">비밀번호</label>
        <Input $id="pw" type="password" placeholder="password" />
      </Content>
      <Content>
        <Button>로그인 하기</Button>
        <Button $kakao>
          <FontAwesomeIcon icon={faComment} />
          카카오 로그인
        </Button>
      </Content>
    </Container>
  );
}

export default Login;

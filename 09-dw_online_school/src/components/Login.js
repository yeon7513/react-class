import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMember } from '../api/firebase';
import { Content, Input, LoginButton, LoginContainer } from './LoginStyledComp';

const INITIAL_VALUES = {
  email: '',
  password: '',
};

function Login() {
  // 코스 페이지에서 넘어올 때 전달받은 state에는 해당 코스 페이지의 pathname이 담겨있음.
  const { state } = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 파이어베이스에 접근해서 사용자가 입력한 이메일을 가진 member를 조회한다.
    const { memberObj, message } = await getMember(values);

    // memberObj에 아무것도 들어있지 않다는 것을 확인하기위해
    // key만 뽑아 배열로 반환 후 length를 확인
    // => 왜? 객체는 길이가 없기 때문에 배열로 반환 후 length가 0이면 빈 객체니까!!
    if (Object.keys(memberObj).length === 0) {
      // 로그인 실패
      alert(message);
    } else {
      // 로그인 성공
      localStorage.setItem('member', JSON.stringify(memberObj));
      alert(message);
      // replace : 디폴트는 false. false면 기록을 남긴다. true는 기록을 남기지 않음.
      // => true면 뒤로가기를 해도 다시 돌아가지 않는다.
      navigate(state ? state : '/', { replace: true });
    }
  };

  return (
    <LoginContainer>
      <h2>DW온라인스쿨 로그인</h2>
      <span>
        회원이 아니신가요? <Link to="#">회원가입 하기</Link>
      </span>
      <Content as="form" onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <Input
          $id="email"
          type="email"
          name="email"
          placeholder="example@DWOS.com"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="pw">비밀번호</label>
        <Input
          $id="pw"
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <LoginButton type="submit" onClick={handleSubmit}>
          로그인 하기
        </LoginButton>
        <LoginButton $kakao>
          <FontAwesomeIcon icon={faComment} />
          카카오 로그인
        </LoginButton>
      </Content>
    </LoginContainer>
  );
}

export default Login;

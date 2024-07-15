import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import TermsOfService from './TermsOfService';

const StyledTermsOfService = styled(TermsOfService)`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 24px;
  padding: 24px;
  width: 420px;
  border-radius: 5px;
  background-color: #ededed;
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
`;
const SubmitButton = styled(Button)`
  padding: 16px 48px;
  background-color: #de117d;
  &:hover {
    background-color: #f5070f;
  }
`;

function Inheritance() {
  return (
    <>
      <StyledTermsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </>
  );
}

export default Inheritance;

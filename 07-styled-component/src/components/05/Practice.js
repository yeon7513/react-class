import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Container = styled.div`
  margin-bottom: 16px;
  width: 500px;
  h2 {
    margin-bottom: 8px;
  }
  & ${Input} {
    margin-bottom: 5px;
  }
`;

function Practice(props) {
  return (
    <>
      <Container>
        <h2>Size</h2>
        <Input $size="small" type="text" />
        <Input $size="medium" type="text" />
        <Input $size="large" type="text" />
      </Container>
      <Container>
        <h2>Round</h2>
        <Input $round type="text" />
      </Container>
      <Container>
        <h2>Error</h2>
        <Input $error type="text" />
      </Container>
    </>
  );
}

export { Practice };

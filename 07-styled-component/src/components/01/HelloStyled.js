import React from 'react';
import Box from './Box';
import Button from './Button';
import Circle from './Circle';
import Input from './Input';
import Wrapper from './Wrapper';

function HelloStyled(props) {
  return (
    <>
      <Wrapper>
        <Box $bgColor="#cf6a87">
          <span></span>
        </Box>
        <Box as="button" $bgColor="#574b90" />
        <Circle $bgColor="blue" />
      </Wrapper>
      <form>
        <Wrapper>
          <Input />
          <Input />
          <Input />
          <Button>제출</Button>
        </Wrapper>
      </form>
      <Wrapper>
        <Circle $bgColor="yellow" />
      </Wrapper>
    </>
  );
}

export default HelloStyled;

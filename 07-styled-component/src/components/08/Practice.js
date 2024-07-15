import React from 'react';
import styled, { css } from 'styled-components';
import SearchIcon from '../../assets/search.png';
import Input from './Input';

const Icon = css`
  background: url(${SearchIcon}) no-repeat top 50% left 16px/20px;
`;

const SearchInput = styled(Input)`
  padding-left: 48px;
  ${Icon}
`;

const Container = styled.div`
  margin-bottom: 24px;
  width: 320px;
  h2 {
    margin-bottom: 8px;
  }
  & ${Input}, ${SearchInput} {
    width: 100%;
  }
`;

function Practice() {
  return (
    <>
      <Container>
        <h2>Input</h2>
        <Input />
      </Container>
      <Container>
        <h2>Search Input</h2>
        <SearchInput />
      </Container>
    </>
  );
}

export { Practice };

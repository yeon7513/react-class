import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const Container = styled.div`
  & ${Button} {
    margin: 10px;
  }
`;

function DynamicStyling() {
  return (
    <Container>
      <h2>기본 버튼</h2>
      <Button $size="small">small</Button>
      <Button $size="medium">medium</Button>
      <Button $size="large">large</Button>
      <h2>둥근 버튼</h2>
      <Button $size="small" $round>
        round small
      </Button>
      <Button $size="medium" $round>
        round medium
      </Button>
      <Button $size="large" $round>
        round large
      </Button>
    </Container>
  );
}

export default DynamicStyling;

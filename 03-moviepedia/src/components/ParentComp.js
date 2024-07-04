import React from 'react';
import ChildrenComp from './ChildrenComp';

function ParentComp() {
  return (
    <div>
      <ChildrenComp greet="hello" />
    </div>
  );
}

export default ParentComp;

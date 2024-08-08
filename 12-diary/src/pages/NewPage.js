import React, { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';
import { changeTitle } from '../util/changeTitle';

function NewPage() {
  useEffect(() => {
    changeTitle('감정 일기장 - 새 일기');
  }, []);

  return (
    <div>
      <DiaryEditor title="새 일기 작성하기" />
    </div>
  );
}

export default NewPage;

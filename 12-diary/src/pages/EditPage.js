import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DiaryEditor from '../components/DiaryEditor';
import { changeTitle } from '../util/changeTitle';

function EditPage() {
  const { state } = useLocation();

  const data = {
    ...state,
    date: new Date(state.date).toISOString().split('T')[0],
  };

  useEffect(() => {
    changeTitle('감정 일기장 - 일기 수정');
  }, []);

  return (
    <div>
      <DiaryEditor title="일기 수정하기" originData={data} isEdit={true} />
    </div>
  );
}

export default EditPage;

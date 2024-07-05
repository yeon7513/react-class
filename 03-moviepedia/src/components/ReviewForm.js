import React, { useRef, useState } from 'react';
import '../css/reivewForm.css';
import FileInput from './FileInput';
import RatingInput from './RatingInput';

const INITIAL_VALUE = {
  title: '',
  rating: 0,
  content: '',
  imgUrl: null,
};

function ReviewForm({ addData, handleAddSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const textRef = useRef(null);

  // 함수를 2개로 나눈 이유
  // -> FileInput과 RatingInput의 값도 받아와야 하기 때문에

  // 같은 input 이지만 type이 다르기 때문에 type이 file인 경우에는
  // value가 없고 files로 가져와야하기 때문에 handleChange만 사용한다.
  // 즉, imgUrl에는 File객체를 넣어줘야하기 때문이다.

  // 파이어베이스에는 로컬 경로로 저장하면 안되고
  // 스토리지에 저장된 이미지의 객체를 가져와야함!!

  // ↓↓ 즉 이 함수는 최종적으로 파이어베이스에 저장할 데이터들로 객체를 만들어주는 함수
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // 키값을 변수 처리하기위해서 대괄호로 감싼다.
    // 대괄호로 감싸지 않으면 'name'이라는 키로 생성된다.
  };

  // ↓↓ 이 함수는 text 데이터들만 처리하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 데이터 전송 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // submit으로 전송하면 버튼 비활성화
    setIsSubmitting(true);

    // form에 작성한 데이터들을 취합해서 컬렉션에 넣는다.
    const result = await addData('movie', values);

    // 데이터를 추가하자마자 화면에 출력
    handleAddSuccess(result);

    // handleAddSuccess가 끝나면 버튼 활성화
    setIsSubmitting(false);
    setValues(INITIAL_VALUE);
    inputRef.current.value = '';
    textRef.current.value = '';
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div>
        <FileInput name="imgUrl" setFile={handleChange} value={values.imgUrl} />
      </div>
      <div className="form-container">
        <input
          type="text"
          name="title"
          ref={inputRef}
          placeholder="제목을 입력해주세요."
          onChange={handleInputChange}
        />
        <RatingInput
          name="rating"
          setRating={handleChange}
          values={values.rating}
        />
        <textarea
          name="content"
          ref={textRef}
          placeholder="내용을 입력해주세요."
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSubmitting}>
          확인
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

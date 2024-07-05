import React, { useEffect, useRef, useState } from 'react';
import resetImg from '../assets/ic-reset.png';
import placeholderImg from '../assets/preview-placeholder.png';
import '../css/fileInput.css';

function FileInput({ name, setFile, value }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    // e.target.files
    // -> fileList 라는 유사 객체
    setFile(name, nextFile);
  };

  const handleClearClick = () => {
    const inputNode = inputRef;
    inputNode.current.value = '';
    setFile(name, null);
    // setPreview(null);
  };

  useEffect(() => {
    // value 값이 없을 수도 있기 때문에 useEffect를 종료해준다.
    // ** useEffect 안에서 return은 '종료'를 의미하기 때문에,
    //    return에 콜백 함수를 써주면 종료하면서 실행할 로직을 의미하지만
    //    return만 써주면 'useEffect 자체를 종료한다.'는 의미이다.
    if (!value) return;

    // ObjectURL 객체를 사용하여 미리보기 기능을 구현할 수 있다.
    // ObjectURL을 만들면 웹 브라우저에 메모리를 할당한다.
    // 할당을 한 이후에는 해제를 해줘야 한다.
    // 왜? -> 메모리 낭비를 방지해야하기 때문.
    // 해제를 하는 시점은 useEffect에서 제공하는 사이드 이펙트를 정리하는 시점에 한다.
    // useEffect에서 return을 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 제거할 수 있다.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 의존성 배열에 있는 값이 바뀌면 다시 콜백 함수를 실행하는 데,
    // 이전에 리액트는 앞에서 리턴한 *정리 함수를 실행해서 사이드 이펙트를 정리한다.
    // * 정리 함수 => clean up 함수 (사이드 이펙트를 정리하는 함수)

    // ** 현재 useEffect 실행 순서
    // 재렌더링 => useEffect 함수 실행 => 그 안에 있는 return 함수 기억
    // => 사용자 파일이 변경되면 value 값 변경으로 인한 useEffect 함수 실행
    // => 앞에서 기억해뒀던 return 함수 실행
    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="file-input">
      <img
        className="preview"
        src={preview || placeholderImg}
        alt="preview images"
      />
      <input
        className="hidden-overlay"
        type="file"
        accept="image/*" // 이미지 형식의 파일만!
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && (
        <button className="clear-btn" onClick={handleClearClick}>
          <img src={resetImg} alt="초기화" />
        </button>
      )}
    </div>
  );
}

export default FileInput;

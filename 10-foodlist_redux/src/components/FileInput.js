import React, { useEffect, useRef, useState } from 'react';
import resetIcon from '../assets/ic-reset-white.png';
import placeholderImg from '../assets/preview-placeholder.png';
import styles from '../css/FileInput.module.css';
import ImageBox from './ImageBox';

function FileInput({ name, setFile, value, initialPreview, selected }) {
  console.log(value);
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(name, nextFile);
  };

  const handleClearClick = () => {
    const inputNode = inputRef;
    inputNode.current.value = '';
    setFile(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className={styles.fileInput}>
      <ImageBox isSelected={selected} imgUrl={preview || placeholderImg} />
      <input
        className={styles.hiddenOverlay}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && (
        <button className={styles.clearBtn} onClick={handleClearClick}>
          <img src={resetIcon} alt="" />
        </button>
      )}
    </div>
  );
}

export default FileInput;

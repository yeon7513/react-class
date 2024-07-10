import React from 'react';
import styles from '../css/MBTISelect.module.css';

const mbtiArr = [
  { char: 'E', desc: '외향형', groupNum: 0 },
  { char: 'I', desc: '내향형', groupNum: 0 },
  { char: 'S', desc: '감각형', groupNum: 1 },
  { char: 'N', desc: '직관형', groupNum: 1 },
  { char: 'T', desc: '사고형', groupNum: 2 },
  { char: 'F', desc: '감정형', groupNum: 2 },
  { char: 'J', desc: '판단형', groupNum: 3 },
  { char: 'P', desc: '인식형', groupNum: 3 },
];

function MBTIOption({ option, selected, changeMbti }) {
  const { char, desc, groupNum } = option;
  const handleMbtiClick = () => {
    changeMbti(groupNum, char);
  };

  return (
    <div
      className={`${styles['mbti-option']} ${selected ? styles.selected : ''}`}
      onClick={handleMbtiClick}
    >
      <span className={styles['mbti-char']}>{char}</span>
      {desc}
    </div>
  );
}

function MBTISelect({ value, handleChange }) {
  const changeMbti = (selectedGroupNum, selectedMbti) => {
    if (value[selectedGroupNum] !== selectedMbti) {
      const beforeValue = value.slice(0, selectedGroupNum);
      const afterValue = value.slice(selectedGroupNum + 1);
      const resultValue = beforeValue + selectedMbti + afterValue;
      handleChange(resultValue);
    }
  };

  return (
    <div className={styles['mbti-options']}>
      {mbtiArr.map((option) => (
        <MBTIOption
          key={option.char}
          option={option}
          selected={value[option.groupNum] === option.char}
          changeMbti={changeMbti}
        />
      ))}
    </div>
  );
}

export default MBTISelect;

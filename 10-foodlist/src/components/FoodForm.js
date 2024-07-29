import React, { useState } from 'react';
import styles from '../css/FoodForm.module.css';
import useAsync from '../hooks/useAsync';
import useTranslate from '../hooks/useTranslate';
import FileInput from './FileInput';
import TextInput from './TextInput';

const INITIAL_VALUES = {
  title: '',
  content: '',
  calorie: 0,
  imgUrl: null,
};

// input의 type이 number인 경우 문자열 형태가 아닌 숫자로 저장되어야 한다.
// function sanitize(type, value) {
//   console.log(type);
//   switch (type) {
//     case 'number':
//       return Number(value) || 0;
//     default:
//       return value;
//   }
// }

function FoodForm({
  selected,
  onSubmit,
  handleCancel,
  initialPreview,
  initialValues = INITIAL_VALUES,
  handleSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  // const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmit, submitError, submit] = useAsync(onSubmit);
  const t = useTranslate();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'calorie') {
      value = Number(e.target.value);
    }

    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submit('foods', values);
    handleSubmitSuccess(result);

    setValues(INITIAL_VALUES);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FileInput
        selected={selected}
        setFile={handleChange}
        name="imgUrl"
        value={values.imgUrl}
        initialPreview={initialPreview}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <TextInput
            name="title"
            value={values.title}
            onChange={handleInputChange}
            placeholder={t('title placeholder')}
          />
          <TextInput
            type="number"
            name="calorie"
            value={values.calorie}
            onChange={handleInputChange}
            placeholder="0"
          />
          <div className={styles.submitBtns}>
            <button type="submit" disabled={isSubmit}>
              {t('confirm button')}
            </button>
            {handleCancel && (
              <button type="button" onClick={() => handleCancel(null)}>
                {t('cancel button')}
              </button>
            )}
          </div>
        </div>
        <textarea
          name="content"
          value={values.content}
          onChange={handleInputChange}
          placeholder={t('content placeholder')}
        />
      </div>
    </form>
  );
}

export default FoodForm;

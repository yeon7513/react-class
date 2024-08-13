import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';

function Form({ title, getDataForm, firebaseError }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  const userEmail = {
    required: '필수 필드입니다.',
  };

  const userPassword = {
    required: '필수 필드입니다.',
    minLength: {
      value: 6,
      message: '최소 6자 입니다.',
    },
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email', userEmail)}
        />
        {errors?.email && (
          <div>
            <span className={styles.error}>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password', userPassword)}
        />
        {errors?.password && (
          <div>
            <span className={styles.error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button>{title}</button>
      {firebaseError && <span className={styles.error}>{firebaseError}</span>}
    </form>
  );
}

export default Form;

import cn from 'classnames';
import React from 'react';
import styles from '../css/Button.module.css';

function Button({ variant, ...restProps }) {
  // 스프레드 연산자를 사용해 나머지 props들을 객체로 모을 수 있다.
  // 이름은 임의로 지정할 수 있음.
  // 이러한 패턴을 rest parameter 라고 한다.
  // => 즉, 모든 Button에 전달된 여러 props들을 모아서 사용할 수 있음.

  return (
    <button
      {...restProps}
      className={cn(styles.button, variant && styles[variant])}
    />
  );
}

export default Button;

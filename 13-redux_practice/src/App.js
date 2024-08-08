import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { down, up } from './counterSlice';
import styles from './css/Counter.module.css';
import { store } from './store.js';

// function reducer(state, action) {
//   if (action.type === 'up') {
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// }

// const initialState = { value: 0 };

function Counter() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const plus = useSelector((state) => state.plus);
  const minus = useSelector((state) => state.minus);
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch({ type: 'up', payload: +2 })
  // }

  // const handleClick = () => {
  // 기본
  // dispatch({ type: 'counter/up', step: 2 });

  // 축약
  // dispatch(counterSlice.actions.up(2));

  // 구조 분해 후 사용
  // dispatch(up(2));
  // };

  return (
    <>
      <div className={styles.counter}>
        <button
          onClick={() => {
            dispatch(up(2));
          }}
        >
          +
        </button>
        {/* {state.value} */}
        {plus}
      </div>
      <div className={styles.counter}>
        <button
          onClick={() => {
            dispatch(down(2));
          }}
        >
          -
        </button>
        {/* {state.value} */}
        {minus}
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;

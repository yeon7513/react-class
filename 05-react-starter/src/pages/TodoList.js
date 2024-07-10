import React, { useState } from 'react';
import '../scss/TodoList.scss';

function TodoList() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo((prev) => [...prev, inputValue]);
    setCount(count + 1);
    setInputValue('');
  };

  return (
    <div className="container todo">
      <h1>My To Do ({count})</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Todo,,,"
          value={inputValue}
          onChange={handleChange}
        />
        <button>Add To Do</button>
      </form>
      <ul>
        {todo.length === 0 && <li>No To Do...</li>}
        {todo.map((list, idx) => (
          <li key={idx}>
            <span>{idx + 1}. </span>
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

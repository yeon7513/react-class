import React from 'react';

function TextInput({
  type = 'text',
  className,
  placeholder,
  name,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;

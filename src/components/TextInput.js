import React from 'react';

function TextInput({ value, onChange, placeholder, className, type = "text", ...props }) { // Додано type та ...props
  return (
    <input
      type={type} // Використовуємо переданий type
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      {...props} // Передаємо всі інші пропси (наприклад, min, step)
    />
  );
}

export default TextInput;
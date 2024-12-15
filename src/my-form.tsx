import React, { useState } from 'react';

export function MyForm() {
  const [value, setValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KeyDown 발생:', event.key);
    // 필요하다면 event.preventDefault()를 호출하여 기본 동작 방지 가능
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KeyUp 발생:', event.key);
    // 필요하다면 event.preventDefault()를 호출하여 기본 동작 방지 가능
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Submit 발생, 현재 값:', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="myInput"
        style={{ display: 'block', marginBottom: '8px' }}
      >
        입력값:
      </label>
      <input
        id="myInput"
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onChange={(e) => setValue(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px', width: '200px' }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>
        제출
      </button>
    </form>
  );
}

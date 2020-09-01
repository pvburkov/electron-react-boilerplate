import React, { memo, useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>Simple counter</h2>
      <div className="counter__number">{count}</div>
      <button
        className="counter__button"
        onClick={() => setCount(count + 1)}
      >
        Increase!
      </button>
    </div>
  );
};

export default memo(App);

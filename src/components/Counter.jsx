import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const onClickBtn = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={onClickBtn}>Click!</button>
    </div>
  );
};

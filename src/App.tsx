import * as React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [arr, setArr] = useState<number[]>([]);

  useEffect(() => {
    setArr(Array.from(new Array(100)));
  }, []);
  return (
    <div className="wrapper">
      <ul className="content">
        {arr.map((i, index) => {
          return <li>{index}</li>;
        })}
      </ul>
    </div>
  );
};
export default App;

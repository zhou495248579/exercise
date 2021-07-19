import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { BScroll } from "./bscroll";
import "./index.scss";
const BScrollExample = () => {
  const [arr, setArr] = useState<number[]>([]);
  const wrapper = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setArr(Array.from(new Array(30)));
    const bs = new BScroll(wrapper.current);
  }, []);
  return (
    <div className="scroll-wrapper" ref={wrapper}>
      <ul className="scroll-content">
        {arr.map((i, index) => {
          return <li key={index}>{index}</li>;
        })}
      </ul>
    </div>
  );
};
export default BScrollExample;

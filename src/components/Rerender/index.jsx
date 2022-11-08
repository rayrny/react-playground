import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "reactstrap";

function GrandChild({ parentName }) {
  return (
    <div>
      나 진짜 쪼꼬미 애기!
      <br /> 부모님은 {parentName}
    </div>
  );
}

function Child() {
  const [name, setName] = useState("레이");

  const handleChangeName = () => {
    setName((prev) => prev + prev);
  };
  return (
    <div>
      나 애기 {name}!<Button onClick={handleChangeName}>이름 바꿀래</Button>
      <hr />
      <GrandChild parentName={name} />
    </div>
  );
}

// let func; 에 담아두고 비교
// useRef, useState 어쨌든 저장만 할 수 있으면 된다.

let func;
function Rerender() {
  const [count, setCount] = useState(0);
  const [dumy, setDumy] = useState("1");
  const func2 = useRef(() => {});

  const handleCounter = () => {
    setCount((prev) => prev + 1);
  };

  const makeDouble = useCallback(
    (count) => {
      if (!Number.isInteger(count)) {
        return 0;
      }
      return count * 2;
    },
    [dumy]
  );

  useEffect(() => {
    console.log("count 의존성 배열 useEffect");
    // 여기서 setState를 하면 어케될까?
    // setDumy((prev) => prev + "0");
  }, [count]);

  //   console.log("그냥 console log 0");
  useEffect(() => {
    console.log("빈 의존성 배열 useEffect");
    func2.current = makeDouble;
    func = makeDouble;
  }, [makeDouble]);

  //   console.log("그냥 console log 1");
  //   console.log(func2.current);
  console.log(func2.current === makeDouble);
  return (
    <div>
      <header>
        <h3>메인 페이지</h3>
      </header>

      <Button onClick={handleCounter}>버튼</Button>

      <div>현재 count: {count}</div>
      <div>count x 2: {makeDouble(count)} </div>
      <hr />
      <Child />
    </div>
  );
}

export default Rerender;

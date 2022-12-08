import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Input } from "reactstrap";

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

const makeDouble = (count) => {
  if (!Number.isInteger(count)) {
    return 0;
  }
  return count * 2;
};

function Family() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const handleCounter = () => {
    setCount((prev) => prev + 1);
  };

  const handleInput = (e) => {
    const { target } = e;
    setInput(target.value);
  };

  useEffect(() => {
    console.log("mounted");

    return () => console.log("** cleanup mounted");
  }, []);

  useEffect(() => {
    console.log("count");
    return () => console.log("** cleanup count");
  }, [count]);

  // useEffect(() => {
  //   console.log("deps 없음!");
  //   return () => console.log("** cleanup deps 없음");
  // });

  return (
    <div>
      <header>
        <h3>메인 페이지</h3>
      </header>

      <Button onClick={handleCounter}>버튼</Button>

      <div>현재 count: {count}</div>
      <div>count x 2: {makeDouble(count)} </div>

      <input
        value={input}
        onChange={handleInput}
        placeholder="이름을 입력하세요."
      />
      <hr />
      <Child />
    </div>
  );
}

export default Family;

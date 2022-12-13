import React, { useState, useEffect } from "react";

import { getUser } from "../apis";
import createPromiseResource from "../utils/createPromiseResource";

// 여기서 react-query나 axios로 비동기 fetch 작업 진행
// https://6391fa92b750c8d178d35d54.mockapi.io/api/profile/:id

function UserItem({ id }) {
  const resource = createPromiseResource(getUser(id));

  console.log(resource.read().data);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const res = await getUser(id);

      setData(res);
    };

    fetch();
  }, [id]);

  console.log(data);
  return <div>이름: {data?.name}</div>;
}

export default UserItem;

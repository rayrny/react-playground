import React from "react";

import { useFetchUser } from "../hooks/useFetchUsers";

// 여기서 react-query나 axios로 비동기 fetch 작업 진행
// https://6391fa92b750c8d178d35d54.mockapi.io/api/profile/:id

function UserItem({ id }) {
  const { isLoading, data } = useFetchUser(id);
  console.log(undefined.name);

  console.log(data);
  return <div>이름: {data.name}</div>;
}

export default UserItem;

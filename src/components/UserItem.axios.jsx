import React, { useEffect } from "react";

import { getUser } from "../apis";
import useSuspendedQuery from "../hooks/useSuspensedQuery";

// 여기서 react-query나 axios로 비동기 fetch 작업 진행
// https://6391fa92b750c8d178d35d54.mockapi.io/api/profile/:id

function UserItem({ id }) {
  const { data } = useSuspendedQuery(["queryKey", id], () => getUser(id));

  return <div>이름: {data.name}</div>;
}

export default UserItem;

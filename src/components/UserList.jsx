import React, { Suspense } from "react";
import UserItem from "./UserItem";

// 여기서 Suspense랑 ErrorBoundary 사용

function UserList() {
  return (
    <div>
      유저 프로필입니다.
      <Suspense fallback={<h6>로딩중...</h6>}>
        <UserItem id={1} />
      </Suspense>
    </div>
  );
}

export default UserList;

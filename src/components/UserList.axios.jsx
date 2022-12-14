import React from "react";
import AsyncBoundary from "./AsyncBoundary";
import UserItemAxios from "./UserItem.axios";

// 여기서 Suspense랑 ErrorBoundary 사용

function UserListAxios() {
  return (
    <div>
      유저 프로필입니다.
      <AsyncBoundary
        pendingFallback={<div>와오오오오오옹 로딩중</div>}
        rejectedFallback={(e) => <div>에러 발생!!!{e.message}</div>}
      >
        <UserItemAxios id={1} />
      </AsyncBoundary>
    </div>
  );
}

export default UserListAxios;

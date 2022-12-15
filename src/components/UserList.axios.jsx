import React from "react";
import AsyncBoundary from "./AsyncBoundary";
import UserItemAxios from "./UserItem.axios";

// 여기서 Suspense랑 ErrorBoundary 사용

function UserListAxios() {
  const ids = [1, 3];
  return (
    <div>
      <h3>유저 프로필 리스트입니다.</h3>
      {ids.map((id) => {
        return (
          <div key={id}>
            <AsyncBoundary
              pendingFallback={<div>로딩중...</div>}
              // rejectedFallback={(e) => <div>에러 발생!!!{e.message}</div>}
            >
              <UserItemAxios id={id} />
            </AsyncBoundary>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default UserListAxios;

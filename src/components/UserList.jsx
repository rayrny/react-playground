import React, { Suspense } from "react";
import AsyncBoundary from "./AsyncBoundary";
import ErrorBoundary from "./AsyncBoundary/ErrorBoundary";
import UserItem from "./UserItem";

// 여기서 Suspense랑 ErrorBoundary 사용

function UserList() {
  return (
    <div>
      유저 프로필입니다.
      <ErrorBoundary fallback={<h3>에러 발생!</h3>}>
        <Suspense fallback={<h6>로딩중...</h6>}>
          <UserItem id={1} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default UserList;

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AsyncBoundary from "../../components/AsyncBoundary";

import Rerender from "../../components/Rerender";
import UserList from "../../components/UserList";
import UserListAxios from "../../components/UserList.axios";

const queryClient = new QueryClient();
function MainPage() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AsyncBoundary
        pendingFallback={<div>main pending</div>}
        errorFallback={<div>main error 발생</div>}
      > */}
      <UserListAxios />
      {/* </AsyncBoundary> */}
    </QueryClientProvider>
  );
}

export default MainPage;

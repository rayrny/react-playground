import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Rerender from "../../components/Rerender";
import UserList from "../../components/UserList";
import UserListAxios from "../../components/UserList.axios";

const queryClient = new QueryClient();
function MainPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <UserListAxios id={1} />
      </div>
    </QueryClientProvider>
  );
}

export default MainPage;

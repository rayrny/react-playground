import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Rerender from "../../components/Rerender";
import UserList from "../../components/UserList";

const queryClient = new QueryClient();
function MainPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <UserList id={1} />
      </div>
    </QueryClientProvider>
  );
}

export default MainPage;

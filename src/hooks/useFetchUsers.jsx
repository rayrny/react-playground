import { useQuery } from "react-query";
import { getUser } from "../apis";

const useFetchUser = (id) => {
  const { isLoading, data, isError, error } = useQuery(
    ["user", id],
    () => getUser(id),
    {
      suspense: true,
    }
  );

  return {
    isLoading,
    data,
    isError,
    error,
  };
};

export { useFetchUser };

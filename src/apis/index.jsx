import axios from "axios";

export const getUser = async (id) => {
  // mockAPI 사이트 링크 - https://mockapi.io/projects/6391fa92b750c8d178d35d55
  const data = await axios.get(
    `https://6391fa92b750c8d178d35d54.mockapi.io/api/profile/${id}`
  );

  return data.data;
};

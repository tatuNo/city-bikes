import axios from "axios";
const baseUrl = "/api/journeys";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

export default { getAll };

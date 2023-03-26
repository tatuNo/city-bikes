import axios from "axios";

const baseUrl = "/api/journeys";

const getAll = async (offset) => {
  const response = await axios.get(`${baseUrl}?limit=10&offset=${offset}`);
  return response;
};

export default { getAll };

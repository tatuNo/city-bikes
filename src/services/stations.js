import axios from "axios";

const baseUrl = "/api/stations";

const getAll = async (params) => {
  const response = await axios.get(`${baseUrl}`, {
    params,
  });
  return response;
};

export default { getAll };

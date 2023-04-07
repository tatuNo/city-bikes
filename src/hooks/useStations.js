import { useQuery } from "react-query";
import stationService from "../services/stations";

const useStations = (params) => {
  const { data, isLoading } = useQuery(
    ["stations", params],
    () => stationService.getAll(params),
    { keepPreviousData: true }
  );

  return {
    isLoading,
    stations: data ? data.data : null,
  };
};

export default useStations;

import { useQuery } from "react-query";
import stationService from "../services/stations";

const useStation = (id) => {
  const { data, isLoading } = useQuery(["station", id], () =>
    stationService.getOne(id)
  );

  return {
    isLoading,
    station: data ? data.data : null,
  };
};

export default useStation;

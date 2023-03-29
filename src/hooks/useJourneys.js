import { useQuery } from "react-query";
import journeyService from "../services/journeys";

const useJourneys = (params) => {
  const { data, isLoading } = useQuery(
    ["journeys", params],
    () => journeyService.getAll(params),
    { keepPreviousData: true }
  );

  return {
    isLoading,
    journeys: data ? data.data : null,
  };
};

export default useJourneys;

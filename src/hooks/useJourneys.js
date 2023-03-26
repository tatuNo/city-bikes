import { useQuery } from "react-query";
import journeyService from "../services/journeys";

const useJourneys = (offset) => {
  const { data, isLoading } = useQuery(
    ["journeys", offset],
    () => journeyService.getAll(offset),
    { keepPreviousData: true }
  );

  return {
    isLoading,
    journeys: data ? data.data : null,
  };
};

export default useJourneys;

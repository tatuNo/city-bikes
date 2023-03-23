import { useQuery } from "react-query";
import journeyService from "../services/journeys";

const useJourneys = () => {
  const { data, isLoading } = useQuery("journeys", journeyService.getAll);

  return {
    isLoading,
    journeys: data ? data.data : null,
  };
};

export default useJourneys;

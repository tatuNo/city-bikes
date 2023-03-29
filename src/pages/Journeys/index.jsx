import { useState } from "react";

import useJourneys from "../../hooks/useJourneys";
import JourneyList from "./JourneyList";
import SearchFilters from "./SearchFilters";
import Pagination from "./Pagination";

const Journeys = () => {
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("id");
  const { journeys, isLoading } = useJourneys({
    offset,
    sort,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = journeys.count;

  return (
    <div>
      <SearchFilters setSort={setSort} />
      <JourneyList journeys={journeys.rows} />
      <Pagination itemCount={itemCount} setOffset={setOffset} />
    </div>
  );
};

export default Journeys;

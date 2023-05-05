import { useState } from "react";

import useJourneys from "../../hooks/useJourneys";
import JourneyList from "./JourneyList";
import SearchFilters from "./SearchFilters";
import Pagination from "../../components/Pagination";

const Journeys = () => {
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("id");
  const [search, setSearch] = useState({});
  const { journeys, isLoading } = useJourneys({
    offset,
    sort,
    ...search,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = journeys.count;

  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="flex flex-1 flex-col gap-10 p-6 md:flex-row">
        <SearchFilters setSort={setSort} setSearch={setSearch} />
        <JourneyList className="flex-1" journeys={journeys.rows} />
      </div>
      <div>
        <Pagination itemCount={itemCount} setOffset={setOffset} />
      </div>
    </div>
  );
};

export default Journeys;

import { useState } from "react";

import useJourneys from "../../hooks/useJourneys";
import JourneyList from "./JourneyList";
import SearchFilters from "./SearchFilters";
import Pagination from "../../components/Pagination";

const limitOptions = [
  { label: "10", value: "10" },
  { label: "30", value: "30" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

const Journeys = () => {
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState(undefined);
  const [search, setSearch] = useState({});
  const [limit, setLimit] = useState("10");
  const { journeys, isLoading, isFetching } = useJourneys({
    offset,
    sort,
    ...search,
    limit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = journeys.count;

  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="flex flex-1 flex-col gap-10 p-6 lg:flex-row">
        <SearchFilters setSearch={setSearch} />
        <JourneyList
          className="flex-1"
          journeys={journeys.rows}
          isFetching={isFetching}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <div>
        <Pagination
          itemCount={itemCount}
          offset={offset}
          setOffset={setOffset}
          limit={limit}
          setLimit={setLimit}
          limitOptions={limitOptions}
        />
      </div>
    </div>
  );
};

export default Journeys;

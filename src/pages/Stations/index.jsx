import { useState } from "react";
import { useDebounce } from "use-debounce";
import useStations from "../../hooks/useStations";
import StationList from "./StationList";
import Pagination from "../../components/Pagination";
import Map from "../../components/Map";

const limitOptions = [
  { label: "10", value: "10" },
  { label: "30", value: "30" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

const Stations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [search] = useDebounce(searchQuery, 500);
  const [offset, setOffset] = useState(0);
  const [circle, setCircle] = useState(null);
  const [limit, setLimit] = useState("10");
  const { stations, isLoading } = useStations({
    offset,
    search: search === "" ? null : search,
    circle,
    limit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = stations.count;

  return (
    <div className="flex flex-1 flex-col text-center">
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="text-left">
          <input
            name="search"
            className="rounded border bg-seondary py-2 px-3"
            defaultValue={null}
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <StationList stations={stations.rows} />
        <Map stations={stations.rows} setCircle={setCircle} controls={true} />
      </div>
      <Pagination
        itemCount={itemCount}
        setOffset={setOffset}
        limit={limit}
        setLimit={setLimit}
        limitOptions={limitOptions}
      />
    </div>
  );
};

export default Stations;

import { useState } from "react";
import { useDebounce } from "use-debounce";
import useStations from "../../hooks/useStations";
import StationList from "./StationList";
import Pagination from "../../components/Pagination";
import Map from "../../components/Map";

const Stations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [search] = useDebounce(searchQuery, 500);
  const [offset, setOffset] = useState(0);
  const { stations, isLoading } = useStations({
    offset,
    search: search === "" ? null : search,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = stations.count;

  return (
    <div>
      <input
        name="search"
        className="text-black"
        defaultValue={null}
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <StationList stations={stations.rows} />
      <Map stations={stations.rows}/>
      <Pagination itemCount={itemCount} setOffset={setOffset} />
    </div>
  );
};

export default Stations;

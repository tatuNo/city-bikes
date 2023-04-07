import { useState } from "react";
import useStations from "../../hooks/useStations";
import StationList from "./StationList";
import Pagination from "../../components/Pagination";

const Stations = () => {
  const [offset, setOffset] = useState(0);
  const { stations, isLoading } = useStations({ offset });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = stations.count;

  return (
    <div>
      <StationList stations={stations.rows} />
      <Pagination itemCount={itemCount} setOffset={setOffset} />
    </div>
  );
};

export default Stations;

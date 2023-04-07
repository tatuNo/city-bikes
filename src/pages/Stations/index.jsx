import useStations from "../../hooks/useStations";
import StationList from "./StationList";

const Stations = () => {
  const { stations, isLoading } = useStations({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StationList stations={stations.rows} />
    </div>
  );
};

export default Stations;

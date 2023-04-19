import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import useStation from "../../hooks/useStation";

const Station = () => {
  const id = useParams().id;
  const { isLoading, station } = useStation(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Name</h2>
      <span>{station.name}</span>
      <h2>Address</h2>
      <span>{station.address}</span>
      <h2>Total departures</h2>
      <span>{station.departureCount}</span>
      <h2>The average distance of a journey starting from the station</h2>
      <span>{station.avgDepartureDistance}</span>
      <h2>Total returns</h2>
      <span>{station.returnCount}</span>
      <h2>The average distance of a journey ending at the station</h2>
      <span>{station.avgReturnDistance}</span>
      <Map stations={[station]} />
    </div>
  );
};

export default Station;

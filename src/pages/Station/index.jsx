import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import useStation from "../../hooks/useStation";
import Doughnuts from "./Doughnuts";
import Bars from "./Bars";

const Station = () => {
  const id = useParams().id;
  const { isLoading, station } = useStation(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const departures = station.departures;
  const returns = station.returns;

  const departureData = {
    labels: departures.map((departure) => departure.departureStation.name),
    datasets: [
      {
        label: "Departures",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: departures.map((departure) => Number(departure.journeyCount)),
      },
    ],
  };

  const returnData = {
    labels: returns.map((return_) => return_.returnStation.name),
    datasets: [
      {
        label: "Returns",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: returns.map((return_) => Number(return_.journeyCount)),
      },
    ],
  };

  const journeyCountData = {
    labels: ["Total departures", "Total returns"],
    datasets: [
      {
        label: "Number of journeys",
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
        data: [Number(station.departureCount), Number(station.returnCount)],
      },
    ],
  };

  const distanceData = {
    labels: [
      "The average distance of a journey starting from the station",
      "The average distance of a journey ending at the station",
    ],
    datasets: [
      {
        label: "Distance",
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
        data: [
          Number(station.avgDepartureDistance),
          Number(station.avgReturnDistance),
        ],
      },
    ],
  };

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
      <Bars departureData={departureData} returnData={returnData} />
      <Doughnuts
        journeyCountData={journeyCountData}
        distanceData={distanceData}
      />
    </div>
  );
};

export default Station;

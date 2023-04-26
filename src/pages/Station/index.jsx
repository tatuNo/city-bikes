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
    <div className="text-center">
      <h1>
        {station.name} - {station.address}
      </h1>
      <div className="grid grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-[1fr,minmax(0,3fr)] lg:grid-rows-[auto,auto,auto,auto]">
        <Doughnuts
          journeyCountData={journeyCountData}
          distanceData={distanceData}
        />
        <Bars departureData={departureData} returnData={returnData} />
        <div className="lg:col-span-2 lg:col-start-1">
          <Map stations={[station]} />
        </div>
      </div>
    </div>
  );
};

export default Station;

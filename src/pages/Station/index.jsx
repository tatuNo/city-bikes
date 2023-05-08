import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map from "../../components/Map";
import useStation from "../../hooks/useStation";
import Doughnuts from "./Doughnuts";
import Bars from "./Bars";

const Station = () => {
  const id = useParams().id;
  const { isLoading, station } = useStation(id);
  const [selectedBarOption, setSelectedBarOption] = useState("departures");
  const [stations, setStations] = useState([]);

  useEffect(() => {
    if (station) {
      setStations([station]);
    }
  }, [station]);

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
        backgroundColor: "#CB2B3E",
        data: departures.map((departure) => Number(departure.journeyCount)),
      },
    ],
  };

  const returnData = {
    labels: returns.map((return_) => return_.returnStation.name),
    datasets: [
      {
        label: "Returns",
        backgroundColor: "#2A81CB",
        data: returns.map((return_) => Number(return_.journeyCount)),
      },
    ],
  };

  const journeyCountData = {
    labels: ["Total departures", "Total returns"],
    datasets: [
      {
        label: "Number of journeys",
        backgroundColor: ["#CB2B3E", "#2A81CB"],
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
        backgroundColor: ["#CB2B3E", "#2A81CB"],
        data: [
          Number(station.avgDepartureDistance),
          Number(station.avgReturnDistance),
        ],
      },
    ],
  };

  const handleCheckboxChange = (checked) => {
    if (!checked) {
      setStations([station]);
      return;
    }

    const stationsToAdd = (
      selectedBarOption === "departures"
        ? station.departures.map((d) => d.departureStation)
        : station.returns.map((r) => r.returnStation)
    ).map((s) => ({
      ...s,
      markerColor: selectedBarOption === "departures" ? "red" : "blue",
    }));

    const filteredStations = stationsToAdd.filter((s) => s.id !== station.id);
    setStations([...stations, ...filteredStations]);
  };

  return (
    <div className="flex flex-1 flex-col gap-10 p-6 text-center">
      <h1 className="text-2xl">
        {station.name} - {station.address}
      </h1>
      <div className="grid flex-1 grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-[1fr,minmax(0,3fr)]">
        <Doughnuts
          journeyCountData={journeyCountData}
          distanceData={distanceData}
        />
        <Bars
          departureData={departureData}
          returnData={returnData}
          handleCheckboxChange={handleCheckboxChange}
          selectedOption={selectedBarOption}
          setSelectedOption={setSelectedBarOption}
        />
        <div className="lg:col-span-2 lg:col-start-1">
          <Map
            stations={stations}
            center={[station.yCoordinate, station.xCoordinate]}
          />
        </div>
      </div>
    </div>
  );
};

export default Station;

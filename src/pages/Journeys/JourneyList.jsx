import Journey from "./Journey";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const JourneyList = ({ journeys, isFetching, sort, setSort }) => {
  const handleSort = (key) => {
    return sort === key ? setSort(`-${key}`) : setSort(key);
  };

  const getSortIcon = (key) => {
    const field = sort?.startsWith("-") ? sort.slice(1) : sort;

    if (field === key) {
      return sort.startsWith("-") ? <FaArrowUp /> : <FaArrowDown />;
    }
    return "";
  };

  return !isFetching ? (
    <table className="w-full flex-1 basis-4/6 border-collapse text-sm">
      <thead>
        <tr>
          <th
            className="cursor-pointer border-b text-center"
            onClick={() => handleSort("departureStation")}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
              Departure Station {getSortIcon("departureStation")}
            </div>
          </th>
          <th
            className="cursor-pointer border-b text-center"
            onClick={() => handleSort("returnStation")}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
              Return Station {getSortIcon("returnStation")}
            </div>
          </th>
          <th
            className="cursor-pointer border-b text-center"
            onClick={() => handleSort("distance")}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
              Distance {getSortIcon("distance")}
            </div>
          </th>
          <th
            className="cursor-pointer border-b text-center"
            onClick={() => handleSort("duration")}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
              Duration {getSortIcon("duration")}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {journeys.map((journey) => (
          <Journey
            key={journey.id}
            departureStation={journey.departureStation}
            returnStation={journey.returnStation}
            distance={journey.distance}
            duration={journey.duration}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <div>Loading...</div>
  );
};
export default JourneyList;

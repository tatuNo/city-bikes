import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Journey from "./Journey";

const JourneyList = ({ journeys, isFetching, sort, setSort }) => {
  const handleSort = (key) =>
    sort === key ? setSort(`-${key}`) : setSort(key);

  const getSortIcon = (key) => {
    const field = sort?.startsWith("-") ? sort.slice(1) : sort;

    if (field === key) {
      return sort.startsWith("-") ? <FaArrowUp /> : <FaArrowDown />;
    }
    return "";
  };

  return !isFetching ? (
    <div className="flex max-h-journeyList w-full basis-4/6 flex-col overflow-y-auto">
      <table className="w-full flex-1 border-collapse text-sm">
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
                Distance (km) {getSortIcon("distance")}
              </div>
            </th>
            <th
              className="cursor-pointer border-b text-center"
              onClick={() => handleSort("duration")}
            >
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                Duration (min) {getSortIcon("duration")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody id="journeys">
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
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default JourneyList;

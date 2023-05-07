import { Link } from "react-router-dom";

const Journey = ({ departureStation, returnStation, distance, duration }) => (
  <tr className="text-center">
    <td className="h-4 cursor-pointer border border-white p-0 hover:bg-seondary">
      <Link
        to={`/stations/${departureStation.id}`}
        className="flex h-full w-full items-center justify-center"
      >
        {departureStation.name}
      </Link>
    </td>
    <td className="h-4 cursor-pointer border border-white hover:bg-seondary">
      <Link
        to={`/stations/${returnStation.id}`}
        className="flex h-full w-full items-center justify-center"
      >
        {returnStation.name}
      </Link>
    </td>
    <td className="border border-white">{distance}</td>
    <td className="border border-white">{duration}</td>
  </tr>
);

export default Journey;

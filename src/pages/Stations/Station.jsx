import { Link } from "react-router-dom";

const Station = ({ id, name, address }) => (
  <tr className="h-12 text-center">
    <td className="h-4 cursor-pointer border border-white hover:bg-seondary">
      <Link
        to={`/stations/${id}`}
        className="flex h-full w-full items-center justify-center"
      >
        {name}
      </Link>
    </td>
    <td className="h-4 cursor-pointer border border-white hover:bg-seondary">
      <Link
        to={`/stations/${id}`}
        className="flex h-full w-full items-center justify-center"
      >
        {address}
      </Link>
    </td>
  </tr>
);

export default Station;

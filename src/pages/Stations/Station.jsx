import { Link } from "react-router-dom";

const Station = ({ id, name, address }) => (
  <tr className="h-12 text-center">
    <td className="border border-white">
      <Link to={`/stations/${id}`}>{name}</Link>
    </td>
    <td className="border border-white">{address}</td>
  </tr>
);

export default Station;

import { Link } from "react-router-dom";

const Station = ({ id, name, address }) => (
  <tr className="text-left">
    <td className="">
      <Link to={`/stations/${id}`}>{name}</Link>
    </td>
    <td className="">{address}</td>
  </tr>
);

export default Station;

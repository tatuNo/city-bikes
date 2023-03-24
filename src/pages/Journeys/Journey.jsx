const Journey = ({ depatureStation, returnStation, distance, duration }) => (
  <tr>
    <td className="p-4 pl-8">{depatureStation}</td>
    <td className="p-4 pl-8">{returnStation}</td>
    <td className="p-4 pl-8">{distance}</td>
    <td className="p-4 pl-8">{duration}</td>
  </tr>
);

export default Journey;

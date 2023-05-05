const Journey = ({ departureStation, returnStation, distance, duration }) => (
  <tr className="text-center">
    <td className="border border-white">{departureStation}</td>
    <td className="border border-white">{returnStation}</td>
    <td className="border border-white">{distance}</td>
    <td className="border border-white">{duration}</td>
  </tr>
);

export default Journey;

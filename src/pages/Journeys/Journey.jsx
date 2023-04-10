const Journey = ({ departureStation, returnStation, distance, duration }) => (
  <tr className="text-left">
    <td className="">{departureStation}</td>
    <td className="">{returnStation}</td>
    <td className="">{distance}</td>
    <td className="">{duration}</td>
  </tr>
);

export default Journey;

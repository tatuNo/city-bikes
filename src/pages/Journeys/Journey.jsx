const Journey = ({ depatureStation, returnStation, distance, duration }) => (
  <tr className="text-left">
    <td className="">{depatureStation}</td>
    <td className="">{returnStation}</td>
    <td className="">{distance}</td>
    <td className="">{duration}</td>
  </tr>
);

export default Journey;

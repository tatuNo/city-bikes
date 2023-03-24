import useJourneys from "../../hooks/useJourneys";

const Journeys = () => {
  const { journeys, isLoading } = useJourneys();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr>
          <th className="border-b p-4 pl-8 text-left">Depature Station</th>
          <th className="border-b p-4 pl-8 text-left">Return Station</th>
          <th className="border-b p-4 pl-8 text-left">Distance</th>
          <th className="border-b p-4 pl-8 text-left">Duration</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        {journeys.rows.map((journey) => (
          <tr key={journey.id}>
            <td className="p-4 pl-8">{journey.depatureStation}</td>
            <td className="p-4 pl-8">{journey.returnStation}</td>
            <td className="p-4 pl-8">{journey.distance}</td>
            <td className="p-4 pl-8">{journey.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Journeys;

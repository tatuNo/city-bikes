import useJourneys from "../../hooks/useJourneys";
import Journey from "./Journey";

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
          <Journey
            key={journey.id}
            depatureStation={journey.depatureStation}
            returnStation={journey.returnStation}
            distance={journey.distance}
            duration={journey.duration}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Journeys;

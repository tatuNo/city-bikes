import useJourneys from "../../hooks/useJourneys";
import Journey from "./Journey";

const Journeys = () => {
  const { journeys, isLoading } = useJourneys();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <div className="hidden p-4 pl-8 text-left sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">Showing X to Y of Z results</p>
        </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <a
            href="!#"
            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Previous
          </a>
          <a
            href="!#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            1
          </a>
          <a
            href="!#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            2
          </a>
          <a
            href="!#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            3
          </a>
          <a
            href="!#"
            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Journeys;

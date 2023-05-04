import Journey from "./Journey";

const JourneyList = ({ journeys }) => (
  <table className="w-full flex-1 table-auto border-collapse text-sm">
    <thead>
      <tr>
        <th className="border-b text-left">Departure Station</th>
        <th className="border-b text-left">Return Station</th>
        <th className="border-b text-left">Distance</th>
        <th className="border-b text-left">Duration</th>
      </tr>
    </thead>
    <tbody className="bg-neutral-700">
      {journeys.map((journey) => (
        <Journey
          key={journey.id}
          departureStation={journey.departureStation.name}
          returnStation={journey.returnStation.name}
          distance={journey.distance}
          duration={journey.duration}
        />
      ))}
    </tbody>
  </table>
);

export default JourneyList;

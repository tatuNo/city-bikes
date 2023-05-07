import Journey from "./Journey";

const JourneyList = ({ journeys }) => (
  <table className="w-full flex-1 basis-4/6 border-collapse text-sm">
    <thead>
      <tr>
        <th className="border-b text-center">Departure Station</th>
        <th className="border-b text-center">Return Station</th>
        <th className="border-b text-center">Distance</th>
        <th className="border-b text-center">Duration</th>
      </tr>
    </thead>
    <tbody>
      {journeys.map((journey) => (
        <Journey
          key={journey.id}
          departureStation={journey.departureStation}
          returnStation={journey.returnStation}
          distance={journey.distance}
          duration={journey.duration}
        />
      ))}
    </tbody>
  </table>
);

export default JourneyList;

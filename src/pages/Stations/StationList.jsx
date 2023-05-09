import Station from "./Station";

const StationList = ({ stations }) => (
  <div className="max-h-stationList w-full overflow-y-auto">
    <table className="w-full table-auto border-collapse text-sm">
      <thead>
        <tr>
          <th className="border-b text-center">Name</th>
          <th className="border-b text-center">Address</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station) => (
          <Station
            id={station.id}
            key={station.id}
            name={station.name}
            address={station.address}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default StationList;

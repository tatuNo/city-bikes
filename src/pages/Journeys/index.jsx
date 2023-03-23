const Journeys = () => (
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
      <tr>
        <td className="p-4 pl-8">Depature Station</td>
        <td className="p-4 pl-8">Return Station</td>
        <td className="p-4 pl-8">123</td>
        <td className="p-4 pl-8">123</td>
      </tr>
      <tr>
        <td className="p-4 pl-8">Depature Station</td>
        <td className="p-4 pl-8">Return Station</td>
        <td className="p-4 pl-8">123</td>
        <td className="p-4 pl-8">123</td>
      </tr>
      <tr>
        <td className="p-4 pl-8">Depature Station</td>
        <td className="p-4 pl-8">Return Station</td>
        <td className="p-4 pl-8">123</td>
        <td className="p-4 pl-8">123</td>
      </tr>
    </tbody>
  </table>
);

export default Journeys;

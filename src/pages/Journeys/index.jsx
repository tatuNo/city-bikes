import { useState } from "react";
import ReactPaginate from "react-paginate";

import useJourneys from "../../hooks/useJourneys";
import Journey from "./Journey";

const Journeys = () => {
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState("id");
  const { journeys, isLoading } = useJourneys({
    offset,
    sort,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const itemCount = journeys.count;
  const itemsPerPage = 10;
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemCount;
    setOffset(newOffset);
  };

  return (
    <div>
      <div>
        <div className="flex pl-8">
          <label htmlFor="sort">
            Order
            <select
              id="sort"
              className="focus:shadow-outline block w-full rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="id">id</option>
              <option value="-distance">Longest distance</option>
              <option value="distance">Shortest distance</option>
              <option value="-duration">Longest duration</option>
              <option value="duration">Shortest duration</option>
            </select>
          </label>
        </div>
      </div>
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
          <p className="text-sm">Showing X to Y of {itemCount} results</p>
        </div>
        <ReactPaginate
          containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
          pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          previousClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          nextClassName="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          activeClassName="relative inline-flex items-center px-4 py-2 bg-indigo-200 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Journeys;

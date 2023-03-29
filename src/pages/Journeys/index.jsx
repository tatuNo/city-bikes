import { useState } from "react";
import ReactPaginate from "react-paginate";

import useJourneys from "../../hooks/useJourneys";
import JourneyList from "./JourneyList";
import SearchFilters from "./SearchFilters";

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
      <SearchFilters setSort={setSort} />
      <JourneyList journeys={journeys.rows} />
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

import { useState } from "react";
import ReactPaginate from "react-paginate";
import RadioGroup from "./RadioGroup";

const Pagination = ({
  itemCount,
  setOffset,
  limit,
  setLimit,
  limitOptions,
}) => {
  const itemsPerPage = Number(limit);
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemCount;
    setOffset(newOffset);
  };

  return (
    <div className="flex flex-col-reverse items-center gap-6 bg-seondary p-4 text-left lg:flex-row lg:justify-between">
      <div className="order-1 lg:order-1">
        <p className="text-sm">Showing X to Y of {itemCount} results</p>
      </div>
      <ReactPaginate
        containerClassName="order-3 lg:order-2 isolate inline-flex -space-x-px rounded-md shadow-sm"
        pageClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white"
        previousClassName="relative z-10 inline-flex items-center bg-orange px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white"
        nextClassName="relative z-10 inline-flex items-center bg-orange px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white"
        breakClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white"
        activeClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 bg-lightorange text-sm font-semibold text-white"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      <div className="order-2 flex items-center lg:order-3">
        <span>Per page</span>
        <RadioGroup
          options={limitOptions}
          selectedOption={limit}
          handleRadioChange={(e) => setLimit(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Pagination;

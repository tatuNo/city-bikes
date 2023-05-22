import ReactPaginate from "react-paginate";
import RadioGroup from "./RadioGroup";

const Pagination = ({
  itemCount,
  offset,
  setOffset,
  limit,
  setLimit,
  limitOptions,
}) => {
  const itemsPerPage = Number(limit);
  const pageCount = Math.ceil(itemCount / itemsPerPage);
  const first = offset + 1;
  const last = Math.min(offset + itemsPerPage, itemCount);
  const currentPage = Math.floor(offset / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemCount;
    setOffset(newOffset);
  };

  const handleLimitChange = (e) => {
    const newLimit = e.target.value;
    const newOffset = Math.floor(offset / newLimit) * newLimit;

    setLimit(newLimit);
    setOffset(newOffset);
  };

  return (
    <div className="flex flex-col-reverse items-center gap-6 bg-seondary p-4 text-left lg:flex-row lg:justify-between">
      <div className="order-1 lg:order-1">
        <p className="text-sm">
          Showing {first} to {last} of {itemCount} results
        </p>
      </div>
      <ReactPaginate
        containerClassName="order-3 lg:order-2 isolate inline-flex -space-x-px rounded-md shadow-sm"
        pageClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white"
        previousClassName="relative z-10 inline-flex items-center bg-orange px-4 py-2 text-sm font-semibold text-white"
        nextClassName="relative z-10 inline-flex items-center bg-orange px-4 py-2 text-sm font-semibold text-white"
        breakClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white"
        activeClassName="relative inline-flex items-center px-4 py-2 bg-lightorange text-sm font-semibold text-white"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
      <div className="order-2 flex items-center lg:order-3">
        <span>Per page</span>
        <RadioGroup
          options={limitOptions}
          selectedOption={limit}
          handleRadioChange={(e) => handleLimitChange(e)}
        />
      </div>
    </div>
  );
};

export default Pagination;

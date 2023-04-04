import ReactPaginate from "react-paginate";

const Pagination = ({ itemCount, setOffset }) => {
  const itemsPerPage = 10;
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemCount;
    setOffset(newOffset);
  };

  return (
    <div className="flex flex-1 flex-col-reverse  items-center justify-between text-left md:flex-row">
      <div>
        <p className="text-sm">Showing X to Y of {itemCount} results</p>
      </div>
      <ReactPaginate
        containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
        pageClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        previousClassName="relative z-10 inline-flex items-center bg-orange-600 px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        nextClassName="relative z-10 inline-flex items-center bg-orange-600 px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        breakClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        activeClassName="relative inline-flex items-center px-2 py-1 md:px-4 md:py-2 bg-orange-300 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

import FilterForm from "./FilterForm";

const SearchFilters = ({ setSearch }) => {
  return (
    <div className="flex basis-2/6 flex-col gap-12">
      <h2 className="font-bold">Filters</h2>
      <div className="flex flex-1 flex-col">
        <FilterForm setSearch={setSearch} />
      </div>
    </div>
  );
};

export default SearchFilters;

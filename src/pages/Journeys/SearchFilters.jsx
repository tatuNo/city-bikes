import FilterForm from "./FilterForm";
import Sort from "./Sort";

const SearchFilters = ({ setSort, setSearch }) => {
  return (
    <div className="flex flex-col">
      <h2 className="pb-4 font-bold">Filters</h2>
      <div className="flex flex-1 flex-col justify-center">
        <Sort setSort={setSort} />
        <FilterForm setSearch={setSearch} />
      </div>
    </div>
  );
};

export default SearchFilters;

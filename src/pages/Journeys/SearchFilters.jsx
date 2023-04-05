import FilterForm from "./FilterForm";
import Sort from "./Sort";

const SearchFilters = ({ setSort, setSearch }) => {
  return (
    <div className="flex flex-col">
      <h2 className="pb-4 font-bold">Filters</h2>
      <Sort setSort={setSort} />
      <FilterForm setSearch={setSearch} />
    </div>
  );
};

export default SearchFilters;

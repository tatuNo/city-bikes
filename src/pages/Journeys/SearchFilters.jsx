import FilterForm from "./FilterForm";

const SearchFilters = ({ setSort, setSearch }) => {
  return (
    <div className="flex flex-col">
      <h2 className="pb-4 font-bold">Filters</h2>
      <div>
        <label htmlFor="sort">
          Order
          <select
            id="sort"
            className="focus:shadow-outline block w-full rounded border border-gray-400 bg-white leading-tight text-black shadow focus:outline-none"
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
      <FilterForm setSearch={setSearch} />
    </div>
  );
};

export default SearchFilters;

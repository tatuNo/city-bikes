const SearchFilters = ({ setSort }) => (
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
);

export default SearchFilters;

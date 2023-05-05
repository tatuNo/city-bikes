const Sort = ({ setSort }) => (
  <div className="mb-10  justify-self-end">
    <label className="text-sm font-bold" htmlFor="sort">
      Order
      <select
        id="sort"
        className="block w-full rounded border bg-seondary py-2 px-3"
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

export default Sort;

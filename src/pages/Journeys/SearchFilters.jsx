import { Form, Formik } from "formik";
import TextField from "../../components/TextField";

const initialValues = {
  station: "",
  maxDistance: "",
  minDistance: "",
  maxDuration: "",
  minDuration: "",
};

const SearchFilters = ({ setSort }) => {
  const onSubmit = (values) => console.log(values);
  return (
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
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        className="mb-4 flex flex-row gap-4 rounded px-8"
      >
        {({ handleSubmit }) => (
          <Form>
            <div>
              <TextField name="station" type="text" label="Station" />
              <TextField
                name="minDistance"
                type="number"
                label="Min distance"
              />
              <TextField
                name="maxDistance"
                type="number"
                label="Max distance"
              />
              <TextField
                name="minDuration"
                type="number"
                label="Min duration"
              />
              <TextField
                name="maxDuration"
                type="number"
                label="Max duration"
              />
              <button type="button" onClick={handleSubmit}>
                Apply
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchFilters;

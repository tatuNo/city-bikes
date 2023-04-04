import { Form, Formik } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";

const validationSchema = Yup.object().shape(
  {
    minDistance: Yup.number().when("maxDistance", {
      is: (val) => val !== undefined,
      then: () => Yup.number().required("Min distance required"),
    }),
    maxDistance: Yup.number().when("minDistance", {
      is: (val) => val !== undefined,
      then: () => Yup.number().required("Max distance required"),
    }),
    minDuration: Yup.number().when("maxDuration", {
      is: (val) => val !== undefined,
      then: () => Yup.number().required("Min duration required"),
    }),
    maxDuration: Yup.number().when("minDuration", {
      is: (val) => val !== undefined,
      then: () => Yup.number().required("Max duration required"),
    }),
  },
  [
    ["maxDistance", "minDistance"],
    ["maxDuration", "minDuration"],
  ]
);

const initialValues = {
  station: "",
  maxDistance: "",
  minDistance: "",
  maxDuration: "",
  minDuration: "",
};

const SearchFilters = ({ setSort, setSearch }) => {
  const onSubmit = ({
    station,
    maxDistance,
    minDistance,
    maxDuration,
    minDuration,
  }) => {
    const search = {};

    if (station) {
      search.station = station;
    }

    if (minDistance && maxDistance) {
      search.distance = `${minDistance},${maxDistance}`;
    }

    if (minDuration && maxDuration) {
      search.duration = `${minDuration},${maxDuration}`;
    }

    setSearch(search);
  };

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
        validationSchema={validationSchema}
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

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

const FilterForm = ({ setSearch }) => {
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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        className="mb-4 flex flex-row rounded"
      >
        {({ handleSubmit }) => (
          <Form>
            <div>
              <TextField name="station" type="text" label="Station" />
              <div className="flex">
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
              </div>
              <div className="flex">
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
              </div>
              <div>
                <button
                  className="mr-2 mb-2 w-full flex-1 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  type="button"
                  onClick={handleSubmit}
                >
                  Apply
                </button>
                <button
                  className="gb-red-700 mr-2 mb-2 w-full flex-1 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  type="button"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FilterForm;

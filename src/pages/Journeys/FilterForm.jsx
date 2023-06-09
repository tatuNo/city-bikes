import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../components/TextField";
import { minutesToSeconds, kilometersToMeters } from "../../util/helpers";

// require max value if min is set & vice versa
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

const FilterForm = ({ setSearch, setOffset }) => {
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
      search.distance = `${kilometersToMeters(
        minDistance
      )},${kilometersToMeters(maxDistance)}`;
    }

    if (minDuration && maxDuration) {
      search.duration = `${minutesToSeconds(minDuration)},${minutesToSeconds(
        maxDuration
      )}`;
    }

    setSearch(search);
    setOffset(0);
  };

  const onReset = () => setSearch({});

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        className="mb-4 flex flex-row rounded"
        onReset={onReset}
      >
        {({ handleSubmit, resetForm }) => (
          <Form>
            <div className="flex flex-col gap-10">
              <TextField name="station" type="text" label="Station" />
              <div className="flex gap-4">
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
              <div className="flex gap-4">
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
                  className="mr-2 mb-2 w-full flex-1 rounded-lg bg-orange px-5 py-2.5 text-sm font-medium text-white"
                  type="button"
                  onClick={handleSubmit}
                >
                  Apply
                </button>
                <button
                  className="gb-red-700 mr-2 mb-2 w-full flex-1 rounded-lg bg-orange px-5 py-2.5 text-sm font-medium text-white"
                  type="button"
                  onClick={resetForm}
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

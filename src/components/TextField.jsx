import { useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <label className="mb-2 block text-sm font-bold">
        {label}
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none text-black"
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextField;

import { useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex-1">
      <label className="block text-sm font-bold">
        {label}
        <input
          className="w-full rounded border bg-seondary py-2 px-3"
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextField;

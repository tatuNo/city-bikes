import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Checkbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    onChange(newCheckedStatus);
  };

  return (
    <div className="flex items-center space-x-2" onClick={handleOnChange}>
      <label className="flex h-4 w-4 cursor-pointer items-center justify-center border border-orange">
        {isChecked && <FaCheck className="text-orange" />}
      </label>
      {label && <span className="cursor-pointer">{label}</span>}
    </div>
  );
};

export default Checkbox;

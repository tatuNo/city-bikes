const RadioGroup = ({ options, selectedOption, handleRadioChange }) =>
  options.map((option) => (
    <RadioOption
      key={option.value}
      option={option}
      selectedOption={selectedOption}
      handleRadioChange={handleRadioChange}
    />
  ));

const RadioOption = ({ option, selectedOption, handleRadioChange }) => (
  <label
    key={option.value}
    className="inline-flex cursor-pointer items-center space-x-2"
  >
    <input
      type="radio"
      className="hidden"
      value={option.value}
      checked={selectedOption === option.value}
      onChange={handleRadioChange}
    />
    <span
      className={`${
        selectedOption === option.value ? "bg-orange" : "bg-secondary"
      } rounded-md border border-orange px-4 py-2`}
    >
      {option.label}
    </span>
  </label>
);

export default RadioGroup;

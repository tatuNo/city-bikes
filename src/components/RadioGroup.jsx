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
      className="form-radio h-4 w-4"
      value={option.value}
      checked={selectedOption === option.value}
      onChange={handleRadioChange}
    />
    <span>{option.label}</span>
  </label>
);

export default RadioGroup;

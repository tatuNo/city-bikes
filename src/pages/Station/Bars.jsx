import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import RadioGroup from "../../components/RadioGroup";
import Checkbox from "../../components/Checkbox";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const departureOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Departures",
    },
  },
};

const returnOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Returns",
    },
  },
};

const options = [
  { label: "Departures", value: "departures" },
  { label: "Returns", value: "returns" },
];

const Bars = ({
  departureData,
  returnData,
  handleCheckboxChange,
  selectedOption,
  setSelectedOption,
}) => {
  const barsElement =
    selectedOption === "departures" ? (
      <Bar options={departureOptions} data={departureData} />
    ) : selectedOption === "returns" ? (
      <Bar options={returnOptions} data={returnData} />
    ) : null;

  return (
    <div>
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <Checkbox label="Show on the map" onChange={handleCheckboxChange} />
        <div className="mx-auto">
          <RadioGroup
            options={options}
            selectedOption={selectedOption}
            handleRadioChange={(e) => setSelectedOption(e.target.value)}
          />
        </div>
      </div>
      <div className="h-96">{barsElement}</div>
    </div>
  );
};

export default Bars;

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

const Bars = ({ departureData, returnData }) => {
  const [selectedOption, setSelectedOption] = useState("departures");

  const barsElement =
    selectedOption === "departures" ? (
      <Bar options={departureOptions} data={departureData} />
    ) : selectedOption === "returns" ? (
      <Bar options={returnOptions} data={returnData} />
    ) : null;

  return (
    <div>
      <RadioGroup
        options={options}
        selectedOption={selectedOption}
        handleRadioChange={(e) => setSelectedOption(e.target.value)}
      />
      <div className="h-96">{barsElement}</div>
    </div>
  );
};

export default Bars;

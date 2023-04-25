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
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const journeyCountDoughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Total journeys",
    },
  },
};

const distanceDoughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Average distance",
    },
  },
};

const options = [
  { label: "Journey count", value: "count" },
  { label: "Average distance", value: "avg" },
];

const Doughnuts = ({ journeyCountData, distanceData }) => {
  const [selectedOption, setSelectedOption] = useState("count");

  const doughnutElement =
    selectedOption === "count" ? (
      <Doughnut options={journeyCountDoughnutOptions} data={journeyCountData} />
    ) : selectedOption === "avg" ? (
      <Doughnut options={distanceDoughnutOptions} data={distanceData} />
    ) : null;

  return (
    <div>
      <RadioGroup
        options={options}
        selectedOption={selectedOption}
        handleRadioChange={(e) => setSelectedOption(e.target.value)}
      />
      {doughnutElement}
    </div>
  );
};

export default Doughnuts;

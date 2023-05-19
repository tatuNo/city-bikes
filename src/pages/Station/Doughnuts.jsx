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
import { Doughnut } from "react-chartjs-2";
import RadioGroup from "../../components/RadioGroup";

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
  maintainAspectRatio: false,
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
  maintainAspectRatio: false,
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

  const doughnutElements = {
    count: (
      <Doughnut options={journeyCountDoughnutOptions} data={journeyCountData} />
    ),
    avg: <Doughnut options={distanceDoughnutOptions} data={distanceData} />,
  };

  return (
    <div>
      <RadioGroup
        options={options}
        selectedOption={selectedOption}
        handleRadioChange={(e) => setSelectedOption(e.target.value)}
      />
      <div className="h-96">{doughnutElements[selectedOption]}</div>
    </div>
  );
};

export default Doughnuts;

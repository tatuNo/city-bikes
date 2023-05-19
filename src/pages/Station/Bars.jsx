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
import { Bar } from "react-chartjs-2";
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
  selectedOption,
  setSelectedOption,
}) => {
  const barsElements = {
    departures: <Bar options={departureOptions} data={departureData} />,
    returns: <Bar options={returnOptions} data={returnData} />,
  };

  return (
    <div>
      <RadioGroup
        options={options}
        selectedOption={selectedOption}
        handleRadioChange={(e) => setSelectedOption(e.target.value)}
      />
      <div className="h-96">{barsElements[selectedOption]}</div>
    </div>
  );
};

export default Bars;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
  maintainAspectRatio: false,
};

const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#3A62F2",
      backgroundColor: "#91A5ED",
    },
  ],
};

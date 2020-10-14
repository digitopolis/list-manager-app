import React from "react";
import { User } from "../interfaces/user";
import { Divider } from "antd";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  constructGenreData,
  DataObject,
  constructMediaData,
} from "../utilities/statsPageHelpers";
import "./components.css";

const StatsPage: React.FC<{ user: User }> = ({ user }) => {
  const completedList = user.lists.find((list) => list.title === "Completed");
  let genreData: DataObject = { datasets: [], labels: [] };
  let mediaData: DataObject = { datasets: [], labels: [] };
  if (completedList) {
    genreData = constructGenreData(completedList);
    mediaData = constructMediaData(completedList);
  }
  const maxValue = Math.max(...mediaData.datasets[0].data);
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: maxValue + 0.2 * maxValue,
          },
        },
      ],
    },
  };
  return (
    <div className="stats">
      <h1 className="list-title">My 2020 Activity</h1>
      <Divider orientation="left">
        <h2>Favorite Genres</h2>
      </Divider>
      <Doughnut data={genreData} />
      <Divider orientation="left">
        <h2>Favorite Media Types</h2>
      </Divider>
      <Bar data={mediaData} options={options} />
    </div>
  );
};

export default StatsPage;

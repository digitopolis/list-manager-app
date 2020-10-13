import React from "react";
import { User } from "../interfaces/user";
import { Divider } from "antd";
import { Doughnut } from "react-chartjs-2";
import { constructData, DataObject } from "../utilities/statsPageHelpers";
import "./components.css";

const StatsPage: React.FC<{ user: User }> = ({ user }) => {
  const completedList = user.lists.find((list) => list.title === "Completed");
  let data: DataObject = { datasets: [], labels: [] };
  if (completedList) {
    data = constructData(completedList);
  }
  return (
    <div className="stats">
      <h1 className="list-title">My 2020 Activity</h1>
      <Divider orientation="left">Favorite Genres</Divider>
      <Doughnut data={data} />
    </div>
  );
};

export default StatsPage;

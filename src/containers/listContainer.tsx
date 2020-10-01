import React from "react";
import { List } from "../interfaces/list";

export const ListContainer: React.FC<{ lists: List[] }> = (props) => {
  const { lists } = props;
  return (
    <div className="list-container">
      <div>
        <h1>{lists[0].title}</h1>
        <p>{lists[0].description}</p>
        <h1>{lists[1].title}</h1>
        <p>{lists[1].description}</p>
      </div>
    </div>
  );
};

import React from "react";
import { List } from "../interfaces/list";

const SingleList: React.FC<{ list: List }> = ({ list }) => {
  const { title, description } = list;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SingleList;

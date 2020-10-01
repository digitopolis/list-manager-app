import React from "react";
import { List } from "../interfaces/list";
import SingleList from "../components/singleList";

const ListContainer: React.FC<{ lists: List[] }> = (props) => {
  const { lists } = props;
  return (
    <div className="list-container">
      <div>
        {lists.map((list) => {
          return <SingleList list={list} />;
        })}
      </div>
    </div>
  );
};

export default ListContainer;

import React from "react";
import { List } from "../interfaces/list";
import SingleList from "../components/singleList";

const ListContainer: React.FC<{ lists: List[]; selectItem: Function }> = (
  props
) => {
  const { lists, selectItem } = props;
  return (
    <div className="list-container">
      <div>
        {lists.map((list) => {
          return (
            <SingleList list={list} key={list.id} selectItem={selectItem} />
          );
        })}
      </div>
    </div>
  );
};

export default ListContainer;

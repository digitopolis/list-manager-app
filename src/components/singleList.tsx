import React from "react";
import { List } from "../interfaces/list";
import ItemContainer from "../containers/itemContainer";

const SingleList: React.FC<{ list: List; selectItem: Function }> = ({
  list,
  selectItem,
}) => {
  const { title, description, items } = list;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <ItemContainer items={items} selectItem={selectItem} />
    </div>
  );
};

export default SingleList;

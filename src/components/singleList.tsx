import React from "react";
import { List } from "../interfaces/list";
import ItemContainer from "../containers/itemContainer";
import "./components.css";

const SingleList: React.FC<{ list: List; selectItem: Function }> = ({
  list,
  selectItem,
}) => {
  const { title, description, items } = list;
  return (
    <div>
      <h1 className="list-title">{title}</h1>
      <p className="subhead">{description}</p>
      <ItemContainer items={items} selectItem={selectItem} />
    </div>
  );
};

export default SingleList;

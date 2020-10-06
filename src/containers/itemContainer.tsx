import React from "react";
import { Item } from "../interfaces/item";
import SingleItem from "../components/singleItem";
import "./containers.css";

const ItemContainer: React.FC<{ items: Item[]; selectItem: Function }> = ({
  items,
  selectItem,
}) => {
  return (
    <div className="item-container">
      {items.map((item) => {
        return <SingleItem item={item} key={item.id} selectItem={selectItem} />;
      })}
    </div>
  );
};

export default ItemContainer;

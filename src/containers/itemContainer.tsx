import React from "react";
import { Item } from "../interfaces/item";
import SingleItem from "../components/singleItem";
import "./containers.css";
import ShowMore from "../components/showMore";

const ItemContainer: React.FC<{
  items: Item[];
  selectItem: Function;
  truncated: boolean;
  selectList?: Function;
}> = ({ items, selectItem, truncated, selectList }) => {
  let itemList = [...items];
  if (truncated) {
    itemList = items.slice(0, 5);
  }
  return (
    <div className="item-container">
      {itemList.map((item) => {
        return <SingleItem item={item} key={item.id} selectItem={selectItem} />;
      })}
      {truncated && selectList ? <ShowMore selectList={selectList} /> : null}
    </div>
  );
};

export default ItemContainer;

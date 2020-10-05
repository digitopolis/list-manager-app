import React from "react";
import { Item } from "../interfaces/item";
import "./components.css";

const SingleItem: React.FC<{ item: Item; selectItem: Function }> = ({
  item,
  selectItem,
}) => {
  const { title, creator, medium, image_url } = item;
  return (
    <div className="single-item">
      <h4>
        <button className="header-link" onClick={() => selectItem(item)}>
          {title}
        </button>
      </h4>
      <div className="placeholder-image"></div>
      <p>{creator}</p>
      <p className="subtext">{medium}</p>
    </div>
  );
};

export default SingleItem;

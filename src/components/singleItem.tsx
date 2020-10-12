import React, { useState } from "react";
import { Item } from "../interfaces/item";
import "./components.css";
import { Redirect } from "react-router";

const SingleItem: React.FC<{ item: Item; selectItem: Function }> = ({
  item,
  selectItem,
}) => {
  const { title, creator, medium, image_url } = item;
  const [selected, setSelected] = useState(false);

  const handleItemSelect = () => {
    selectItem(item);
    setSelected(true);
  };

  return (
    <div className="single-item">
      {selected ? (
        <Redirect to="/item-details" />
      ) : (
        <>
          <h4>
            <button className="header-link" onClick={handleItemSelect}>
              {title}
            </button>
          </h4>
          <div className="placeholder-image"></div>
          <p>{creator}</p>
          <p className="subtext">{medium}</p>
        </>
      )}
    </div>
  );
};

export default SingleItem;

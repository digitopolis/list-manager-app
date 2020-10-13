import React, { useState } from "react";
import { Item } from "../interfaces/item";
import "./components.css";
import { Redirect } from "react-router";
import { Colors } from "../tagColors";
import { Tag } from "antd";

const SingleItem: React.FC<{ item: Item; selectItem: Function }> = ({
  item,
  selectItem,
}) => {
  const { title, creator, medium, image_url, tags } = item;
  const [selected, setSelected] = useState(false);

  const handleItemSelect = () => {
    selectItem(item);
    setSelected(true);
  };

  const generateTag = (tag: string) => {
    let color = "";
    if (Object.keys(Colors).includes(tag)) {
      color = Colors[tag];
    } else {
      color = Colors["Custom"];
    }
    return <Tag color={color}>{tag}</Tag>;
  };

  return (
    <div className="single-item">
      {selected ? (
        <Redirect to="/item-details" />
      ) : (
        <>
          <h3>
            <button className="header-link" onClick={handleItemSelect}>
              {title}
            </button>
          </h3>
          {image_url ? (
            <img className="image-small" src={image_url} alt="Cover" />
          ) : (
            <div className="placeholder-image"></div>
          )}
          <p>{creator}</p>
          <p className="subtext">{medium}</p>
          <div className="tag-container">
            {tags.map((tag) => {
              return generateTag(tag);
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SingleItem;

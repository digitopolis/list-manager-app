import React, { useState } from "react";
import { List } from "../interfaces/list";
import ItemContainer from "../containers/itemContainer";
import "./components.css";
import { Redirect } from "react-router";

const SingleList: React.FC<{
  list: List;
  selectItem: Function;
  selectList: Function;
}> = ({ list, selectItem, selectList }) => {
  const { title, description, items } = list;
  const [selected, setSelected] = useState(false);

  const handleListSelect = () => {
    selectList(list);
    setSelected(true);
  };
  return (
    <div>
      {selected ? <Redirect to="/list-view" /> : null}
      <h1 className="list-title" onClick={handleListSelect}>
        {title}
      </h1>
      <p className="subhead">{description}</p>
      <ItemContainer
        items={items}
        selectItem={selectItem}
        truncated={items.length > 5 ? true : false}
        selectList={handleListSelect}
      />
    </div>
  );
};

export default SingleList;

import React from "react";
import { List } from "../interfaces/list";
import "./components.css";
import ItemContainer from "../containers/itemContainer";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const ListView: React.FC<{
  list: List;
  selectItem: Function;
  selectList: Function;
}> = ({ list, selectItem, selectList }) => {
  const { title, description, items } = list;
  return (
    <div>
      <Button icon={<LeftOutlined />} onClick={() => selectList(null)} />
      <h1 className="list-title">{title}</h1>
      <p className="subhead">{description}</p>
      <ItemContainer items={items} selectItem={selectItem} truncated={false} />
    </div>
  );
};

export default ListView;

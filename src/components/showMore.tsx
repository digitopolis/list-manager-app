import React from "react";
import { List } from "../interfaces/list";
import "./components.css";
import { RightOutlined } from "@ant-design/icons";

const ShowMore: React.FC<{ selectList: Function }> = ({ selectList }) => {
  return (
    <div className="show-more" onClick={() => selectList()}>
      <div className="more-icon">
        <RightOutlined />
        <p>View list</p>
      </div>
    </div>
  );
};

export default ShowMore;

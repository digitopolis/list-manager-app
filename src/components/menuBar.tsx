import React from "react";
import "./components.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import NewListForm from "../forms/newListForm";
import NewItemForm from "../forms/newItemForm";
import { List } from "../interfaces/list";

const { SubMenu, Item } = Menu;

const MenuBar: React.FC<{
  loggedIn: boolean;
  toggleSignup: Function;
  selectForm: Function;
  signOut: Function;
  userID: number;
  lists: List[];
  updateUser: Function;
  mode:
    | "horizontal"
    | "vertical-left"
    | "vertical-right"
    | "vertical"
    | "inline";
  width?: number;
}> = ({
  loggedIn,
  toggleSignup,
  selectForm,
  signOut,
  userID,
  lists,
  updateUser,
  mode,
  width,
}) => {
  const handleSignOut = (): void => {
    toggleSignup(false);
    signOut();
  };
  return (
    <div style={{ width: width ? width : "100%" }}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode={mode}
        theme="light"
        inlineCollapsed={width ? true : false}
      >
        <Item key="1" icon={<UserOutlined />}>
          <Link to="/" onClick={handleSignOut}>
            {loggedIn ? "Sign Out" : "Sign In"}
          </Link>
        </Item>
        <SubMenu
          key="lists"
          icon={<UnorderedListOutlined />}
          disabled={!loggedIn}
        >
          <Item key="3">
            <Link to="/profile">My Lists</Link>
          </Item>
          <Item
            key="4"
            onClick={() =>
              selectForm(
                <NewListForm user_id={userID} updateUser={updateUser} />
              )
            }
          >
            Add New List
          </Item>
        </SubMenu>
        <Item
          key="5"
          icon={<FileAddOutlined />}
          disabled={!loggedIn}
          onClick={() =>
            selectForm(
              <NewItemForm
                lists={lists}
                inProgressListID={lists[0].id}
                updateUser={updateUser}
              />
            )
          }
        >
          Add Item
        </Item>
        <Item key="6" icon={<PieChartOutlined />}>
          <Link to="/user-stats">Stats</Link>
        </Item>
      </Menu>
    </div>
  );
};

export default MenuBar;

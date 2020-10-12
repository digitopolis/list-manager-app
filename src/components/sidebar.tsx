import React from "react";
import "./components.css";
import "antd/dist/antd.css";
import { Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import NewListForm from "../forms/newListForm";
import NewItemForm from "../forms/newItemForm";
import { List } from "../interfaces/list";

const { SubMenu, Item } = Menu;

const Sidebar: React.FC<{
  loggedIn: boolean;
  toggleSignup: Function;
  selectForm: Function;
  signOut: Function;
  userID: number;
  lists: List[];
  updateUser: Function;
}> = ({
  loggedIn,
  toggleSignup,
  selectForm,
  signOut,
  userID,
  lists,
  updateUser,
}) => {
  const handleSignOut = (): void => {
    toggleSignup(false);
    signOut();
  };
  return (
    <div style={{ width: 50 }}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={true}
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
      </Menu>
    </div>
  );
};

export default Sidebar;

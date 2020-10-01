import React from "react";
import "./components.css";
import { User } from "../interfaces/user";
import { List } from "../interfaces/list";
import { ListContainer } from "../containers/listContainer";
import { userInfo } from "os";

const ProfilePage: React.FC<{ user: User | null }> = (props) => {
  const { user } = props;
  return (
    <div className="profile-page">
      <ListContainer lists={user ? user.lists : []} />
    </div>
  );
};

export default ProfilePage;

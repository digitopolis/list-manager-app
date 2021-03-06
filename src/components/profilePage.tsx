import React, { useState, useEffect } from "react";
import "./components.css";
import { User } from "../interfaces/user";
import ListContainer from "../containers/listContainer";

const ProfilePage: React.FC<{
  user: User | null;
  selectItem: Function;
  selectList: Function;
}> = (props) => {
  const { user, selectItem, selectList } = props;
  const [lists, setLists] = useState(user ? user.lists : []);

  useEffect(() => {
    if (user) {
      setLists(user.lists);
    }
  });

  return (
    <div className="profile-page">
      <ListContainer
        lists={lists}
        selectItem={selectItem}
        selectList={selectList}
      />
    </div>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import "./components.css";
import { User } from "../interfaces/user";
import { List } from "../interfaces/list";
import ListContainer from "../containers/listContainer";
import NewListForm from "../forms/newListForm";

const ProfilePage: React.FC<{ user: User | null }> = (props) => {
  const { user } = props;
  const [lists, setLists] = useState(user ? user.lists : []);
  const [showNewListForm, toggleShowForm] = useState(false);

  const addList = (list: List) => {
    setLists([...lists, list]);
  };

  const showForm = (): JSX.Element => {
    return (
      <NewListForm
        user_id={user ? user.id : 0}
        addList={addList}
        toggleShowForm={toggleShowForm}
      />
    );
  };

  const showButton = () => {
    return <button onClick={() => toggleShowForm(true)}>Create List</button>;
  };

  return (
    <div className="profile-page">
      {showNewListForm ? showForm() : showButton()}
      <ListContainer lists={lists} />
    </div>
  );
};

export default ProfilePage;

import React, { useState } from "react";
import "./components.css";
import { User } from "../interfaces/user";
import { List } from "../interfaces/list";
import { Item } from "../interfaces/item";
import ListContainer from "../containers/listContainer";
import NewListForm from "../forms/newListForm";
import NewItemForm from "../forms/newItemForm";
import ItemDetails from "../components/itemDetails";

const ProfilePage: React.FC<{ user: User | null }> = (props) => {
  const { user } = props;
  const [lists, setLists] = useState(user ? user.lists : []);
  const [showNewListForm, toggleShowListForm] = useState(false);
  const [showNewItemForm, toggleShowItemForm] = useState(false);
  const [showItemDetails, toggleShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    user
      ? user.lists[0].items[0]
      : { id: 0, title: "", creator: "", medium: "", image_url: "", lists: [] }
  );

  const addList = (list: List) => {
    setLists([...lists, list]);
  };

  const updateLists = (user: User) => {
    setLists(user.lists);
    toggleShowItemDetails(false);
  };

  const showForm = (): JSX.Element => {
    return (
      <NewListForm
        user_id={user ? user.id : 0}
        addList={addList}
        toggleShowForm={toggleShowListForm}
      />
    );
  };

  const showButton = () => {
    return (
      <button onClick={() => toggleShowListForm(true)}>Create List</button>
    );
  };

  const showItemForm = (): JSX.Element => {
    return (
      <NewItemForm
        inProgressListID={lists[0].id}
        lists={lists}
        updateLists={updateLists}
        toggleShowForm={toggleShowItemForm}
      />
    );
  };

  const selectItem = (item: Item) => {
    setSelectedItem(item);
    toggleShowItemDetails(true);
  };

  const showItemButton = () => {
    return <button onClick={() => toggleShowItemForm(true)}>Add Item</button>;
  };

  return (
    <div className="profile-page">
      {showNewItemForm ? showItemForm() : showItemButton()}
      {showNewListForm ? showForm() : showButton()}

      {showItemDetails ? (
        <ItemDetails
          item={selectedItem}
          user_id={user ? user.id : 0}
          list_id={lists[0].id}
          updateLists={updateLists}
        />
      ) : (
        <ListContainer lists={lists} selectItem={selectItem} />
      )}
    </div>
  );
};

export default ProfilePage;

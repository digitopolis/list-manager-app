import React, { useState, useEffect } from "react";
import "./components.css";
import { User } from "../interfaces/user";
import { List } from "../interfaces/list";
import { Item } from "../interfaces/item";
import ListContainer from "../containers/listContainer";
import NewListForm from "../forms/newListForm";
import NewItemForm from "../forms/newItemForm";
import ItemDetails from "../components/itemDetails";

const ProfilePage: React.FC<{ user: User | null; selectItem: Function }> = (
  props
) => {
  const { user, selectItem } = props;
  const [lists, setLists] = useState(user ? user.lists : []);
  const [showNewListForm, toggleShowListForm] = useState(false);
  const [showNewItemForm, toggleShowItemForm] = useState(false);
  const [showItemDetails, toggleShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    user
      ? user.lists[0].items[0]
      : { id: 0, title: "", creator: "", medium: "", image_url: "", lists: [] }
  );

  useEffect(() => {
    if (user) {
      setLists(user.lists);
    }
  });

  const updateLists = (user: User) => {
    setLists(user.lists);
    toggleShowItemDetails(false);
  };

  //   const selectItem = (item: Item) => {
  //     setSelectedItem(item);
  //     toggleShowItemDetails(true);
  //   };

  return (
    <div className="profile-page">
      <ListContainer lists={lists} selectItem={selectItem} />
    </div>
  );
};

export default ProfilePage;

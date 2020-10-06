import React, { useState } from "react";
import { Item } from "../interfaces/item";
import { COMPLETE } from "../apiEndpoints";

const ItemDetails: React.FC<{
  item: Item;
  list_id: number;
  user_id: number;
  updateLists: Function;
}> = (props) => {
  const { id, title, creator, medium } = props.item;
  const { list_id, user_id, updateLists } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = () => {
    const data = {
      item_id: id,
      list_id: list_id,
      user_id: user_id,
    };
    fetch(COMPLETE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(handleResponse);
  };

  const handleResponse = (response: {
    user?: {};
    message?: string;
    error?: string;
  }) => {
    if (response.user) {
      console.log(response);
      alert(response.message);
      updateLists(response.user);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };
  return (
    <div className="item-details">
      <div>
        <h1>{title}</h1>
        <div className="placeholder-image"></div>
        <p>By {creator}</p>
        <p className="subtext">{medium}</p>
      </div>
      <button onClick={handleSubmit}>Completed</button>
      {errorMessage !== "" ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
    </div>
  );
};

export default ItemDetails;

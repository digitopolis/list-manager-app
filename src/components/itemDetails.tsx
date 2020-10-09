import React, { useState } from "react";
import { Item } from "../interfaces/item";
import { COMPLETE, ADD_TO_LIST } from "../apiEndpoints";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { List } from "../interfaces/list";
import { Redirect } from "react-router";
import "./components.css";

interface Values {
  list_id: number;
  item_id: number;
}

const ItemDetails: React.FC<{
  item: Item;
  list_id: number;
  user_id: number;
  selectItem: Function;
  userLists: List[];
  updateUser: Function;
  // updateLists: Function;
}> = (props) => {
  const { id, title, creator, medium, lists } = props.item;
  const { list_id, user_id, selectItem, userLists, updateUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const markCompleted = () => {
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

  const addToList = (values: Values) => {
    fetch(ADD_TO_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
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
      alert(response.message);
      updateUser(response.user);
      setSubmitted(true);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };
  return (
    <div className="item-details">
      <Button icon={<LeftOutlined />} onClick={() => selectItem(null)} />
      <div>
        <h1>{title}</h1>
        <div className="placeholder-image-large"></div>
        <p>By {creator}</p>
        <p className="subtext">{medium}</p>
      </div>
      <button onClick={markCompleted}>Completed</button>
      {errorMessage !== "" ? (
        <div className="error-message">{errorMessage}</div>
      ) : null}
      <div>
        <h2>Currently in these lists:</h2>
        <ul className="item-lists">
          {lists.map((list) => {
            return (
              <li className="item-list-title">
                <h3>{list.title}</h3>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <Formik
          initialValues={{ item_id: id, list_id: userLists[0].id }}
          onSubmit={(values: Values) => addToList(values)}
        >
          <Form>
            <label htmlFor="list_id">Add to list:</label>
            <Field id="list_id" name="list_id" as="select">
              {userLists.map((list) => {
                return (
                  <option value={list.id} key={list.id}>
                    {list.title}
                  </option>
                );
              })}
            </Field>
            <div>
              <button type="submit">Submit</button>
              {errorMessage !== "" ? (
                <div className="error-message">{errorMessage}</div>
              ) : null}
            </div>
          </Form>
        </Formik>
      </div>
      {submitted ? <Redirect to="/profile" /> : null}
    </div>
  );
};

export default ItemDetails;

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { validatePresence } from "./validators";
import { ITEMS } from "../apiEndpoints";
import { List } from "../interfaces/list";
import { Redirect } from "react-router";

interface Values {
  title: String;
  creator: String;
  image_url: String;
  medium: String;
  list_id: Number;
  tags: String[];
  custom_tag: String;
}

const NewItemForm: React.FC<{
  inProgressListID: number;
  lists: List[];
  hideModal?: Function;
  updateUser: Function;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { inProgressListID, lists, hideModal, updateUser } = props;

  const handleSubmit = (values: Values) => {
    const { custom_tag, ...data } = values;
    if (custom_tag) {
      data.tags = [...data.tags, custom_tag];
    }
    fetch(ITEMS, {
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
    item?: {};
    lists?: [];
    user?: {};
    message?: string;
    error?: string;
  }) => {
    if (response.item) {
      alert(response.message);
      updateUser(response.user);
      handleCancel();
      setSubmitted(true);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };

  const handleCancel = () => {
    if (hideModal) {
      hideModal();
    }
  };

  return (
    <div>
      <h1>Add new item:</h1>
      <Formik
        initialValues={{
          title: "",
          creator: "",
          medium: "",
          image_url: "",
          list_id: inProgressListID,
          tags: [],
          custom_tag: "",
        }}
        onSubmit={(values: Values) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              name="title"
              placeholder="Title"
              validate={validatePresence}
            />
            {errors.title && touched.title ? (
              <div className="error-message">{errors.title}</div>
            ) : null}
            <label htmlFor="creator">Author/Director/Host, etc.</label>
            <Field
              id="creator"
              name="creator"
              type="creator"
              placeholder="Author/Director/Host, etc."
            />
            <label htmlFor="medium">Medium</label>
            <Field
              id="medium"
              name="medium"
              placeholder="Medium"
              validate={validatePresence}
            />
            {errors.medium && touched.medium ? (
              <div className="error-message">{errors.medium}</div>
            ) : null}
            <label htmlFor="image_url">Cover image</label>
            <Field
              id="image_url"
              name="image_url"
              type="image_url"
              placeholder="Image URL"
            />
            <div>Genres:</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="tags" value="Comedy" />
                Comedy
              </label>
              <label>
                <Field type="checkbox" name="tags" value="Drama" />
                Drama
              </label>
              <label>
                <Field type="checkbox" name="tags" value="Action" />
                Action
              </label>
              <label>
                <Field type="checkbox" name="tags" value="Horror" />
                Horror
              </label>
              <label>
                <Field type="checkbox" name="tags" value="Mystery" />
                Mystery
              </label>
              <label>
                <Field type="checkbox" name="tags" value="Non-Fiction" />
                Non-Fiction
              </label>
            </div>
            <label htmlFor="custom_tag">Add a tag</label>
            <Field
              id="custom_tag"
              name="custom_tag"
              type="custom_tag"
              placeholder="Custom Tag"
            />
            <label htmlFor="list_id">Choose a list:</label>
            <Field id="list_id" name="list_id" as="select">
              {lists.map((list) => {
                return (
                  <option value={list.id} key={list.id}>
                    {list.title}
                  </option>
                );
              })}
            </Field>
            <div>
              <button type="button" onClick={() => handleCancel()}>
                Cancel
              </button>
              <button type="submit">Submit</button>
              {errorMessage !== "" ? (
                <div className="error-message">{errorMessage}</div>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
      {submitted ? <Redirect to="/profile" /> : null}
    </div>
  );
};

export default NewItemForm;

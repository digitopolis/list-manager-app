import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { validatePresence } from "./validators";
import { LISTS } from "../apiEndpoints";
import { Redirect } from "react-router";
import { Button } from "antd";

interface Values {
  title: String;
  description: String;
  user_id?: Number;
}

const NewListForm: React.FC<{
  user_id: number;
  hideModal?: Function;
  updateUser: Function;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user_id, hideModal, updateUser } = props;

  const handleSubmit = (values: Values, user_id: number) => {
    const data = { ...values };
    data.user_id = user_id;
    fetch(LISTS, {
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
    list?: {};
    user?: {};
    error?: string;
  }) => {
    if (response.list) {
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
      <h1>Create new list:</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          user_id: user_id,
        }}
        onSubmit={(values: Values) => handleSubmit(values, user_id)}
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
            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              type="description"
              placeholder="Description"
            />
            <div className="button-div">
              <Button type="default" onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
            <div>
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

export default NewListForm;

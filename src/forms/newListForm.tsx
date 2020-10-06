import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { validatePresence } from "./validators";
import { LISTS } from "../apiEndpoints";

interface Values {
  title: String;
  description: String;
  user_id?: Number;
}

const NewListForm: React.FC<{
  user_id: number;
  addList: Function;
  toggleShowForm: Function;
}> = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user_id, addList, toggleShowForm } = props;

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

  const handleResponse = (response: { list?: {}; error?: string }) => {
    if (response.list) {
      addList(response.list);
      toggleShowForm(false);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };

  return (
    <div>
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
            {" "}
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
            <button type="submit">Submit</button>
            {errorMessage !== "" ? (
              <div className="error-message">{errorMessage}</div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewListForm;

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { validateEmail } from "./validators";
import { FORGOT } from "../apiEndpoints";
import { Redirect } from "react-router";
import { Button } from "antd";

interface Values {
  email: string;
}

const ForgotPassword: React.FC<{}> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (values: Values) => {
    fetch(FORGOT, {
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

  const handleResponse = (response: { message?: string; error?: string }) => {
    if (response.message) {
      setSubmitted(true);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };

  return (
    <div className="signup-form">
      {submitted ? <Redirect to="/" /> : null}
      <h1>Forgot your password?</h1>
      <p>
        Enter the email address associated with your account to receive a link
        to reset your password
      </p>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              validate={validateEmail}
            />
            {errors.email && touched.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
            <div className="button-div">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
            {errorMessage !== "" ? (
              <div className="error-message">{errorMessage}</div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;

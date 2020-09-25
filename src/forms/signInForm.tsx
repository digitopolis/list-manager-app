import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";
import { validateEmail, validatePassword } from "./validators";
import { LOGIN } from "../apiEndpoints";
import { Redirect } from "react-router";

interface Values {
  email: string;
  password: string;
}

const SignInForm: React.FC<{}> = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (values: Values) => {
    fetch(LOGIN, {
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
    user?: { email: string };
    error?: string;
  }) => {
    if (response.user) {
      setLoggedIn(true);
    } else if (response.error) {
      setErrorMessage(response.error);
    }
  };

  return (
    <div className="signup-form">
      {loggedIn ? <Redirect to="/profile" /> : null}
      <h1>Sign in!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
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

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              validate={validatePassword}
            />
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}

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

export default SignInForm;

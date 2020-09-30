import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { USERS } from "../apiEndpoints";
import "./form.css";
import { Redirect } from "react-router";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "./validators";

interface Values {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignupForm: React.FC<{}> = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (values: Values) => {
    const { passwordConfirm, ...data } = values;
    fetch(USERS, {
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
    user?: { email: string };
    error?: string;
  }) => {
    if (response.user) {
      setLoggedIn(true);
    } else if (response.error) {
      setErrorMessage("Account already registered to that email address");
    }
  };
  return (
    <div className="signup-form">
      {loggedIn ? <Redirect to="/profile" /> : null}
      <h1>Sign up!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values: Values) => handleSubmit(values)}
      >
        {({ errors, touched, values, isSubmitting }) => (
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
              validate={() => validatePassword(values.password)}
            />
            {errors.password && touched.password ? (
              <div className="error-message">{errors.password}</div>
            ) : null}

            <label htmlFor="passwordConfirm">Confirm password</label>
            <Field
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              validate={() =>
                validatePasswordConfirm(values.password, values.passwordConfirm)
              }
            />
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <div className="error-message">{errors.passwordConfirm}</div>
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

export default SignupForm;

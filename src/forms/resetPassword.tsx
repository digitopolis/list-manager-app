import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { RESET } from "../apiEndpoints";
import "./form.css";
import { Redirect } from "react-router";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "./validators";
import { Button } from "antd";

interface Values {
  email: string;
  token: string;
  password: string;
  passwordConfirm: string;
}

const ResetPassword: React.FC<{}> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (values: Values) => {
    const { passwordConfirm, ...data } = values;
    fetch(RESET, {
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
      <h1>Password Reset</h1>
      <Formik
        initialValues={{
          email: "",
          token: "",
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

            <label htmlFor="token">Token</label>
            <Field id="token" name="token" placeholder="token" />

            <label htmlFor="password">New Password</label>
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

export default ResetPassword;

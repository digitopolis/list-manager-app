import React from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";

interface Values {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const validateEmail = (value: string) => {
  let error: string = "";
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

export const validatePassword = (password: string) => {
  let error: string = "";
  if (!password) {
    error = "Required";
  }
  return error;
};

export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
) => {
  let error: string = "";
  if (!passwordConfirm) {
    error = "Required";
  } else if (password !== passwordConfirm) {
    error = "Passwords must match";
  }
  return error;
};

const SignupForm: React.FC<{}> = () => {
  return (
    <div className="signup-form">
      <h1>Sign up!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
        }}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;

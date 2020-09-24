import React from "react";
import { Formik, Form, Field } from "formik";
import "./form.css";

interface Values {
  email: string;
  password: string;
}

const SignInForm: React.FC<{}> = () => (
  <div className="signup-form">
    <h1>Sign in!</h1>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values: Values) => {
        alert(
          `submitting! email: ${values.email}, password: ${values.password}`
        );
      }}
    >
      <Form className="form">
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" placeholder="Email" />

        <label htmlFor="password">Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default SignInForm;

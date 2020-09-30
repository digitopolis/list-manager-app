import React, { useState } from "react";
import SignupForm from "./forms/signupForm";
import FormContainer from "./containers/formContainer";
import "./App.css";
import SignInForm from "./forms/signInForm";

function App() {
  const [showSignup, toggleSignup] = useState(true);
  return (
    <div className="App">
      <FormContainer>
        {showSignup ? <SignupForm /> : <SignInForm />}
        <button
          className="button-link"
          onClick={() => toggleSignup(!showSignup)}
        >
          {showSignup
            ? "Already have an account? Log in here"
            : "New user? Sign up here"}
        </button>
      </FormContainer>
    </div>
  );
}

export default App;

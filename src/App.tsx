import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignupForm from "./forms/signupForm";
import FormContainer from "./containers/formContainer";
import "./App.css";
import SignInForm from "./forms/signInForm";

function App() {
  const [showSignup, toggleSignup] = useState(true);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
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
        </Route>
        <Route path="/profile">
          <div>
            <h1>In Progress</h1>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

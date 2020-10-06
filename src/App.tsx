import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SignupForm from "./forms/signupForm";
import FormContainer from "./containers/formContainer";
import MainContainer from "./containers/mainContainer";
import ProfilePage from "./components/profilePage";
import "./App.css";
import SignInForm from "./forms/signInForm";
import ForgotPassword from "./forms/forgotPassword";
import ResetPassword from "./forms/resetPassword";
import { User } from "./interfaces/user";

type CurrentUser = User | null;

function App() {
  const [showSignup, toggleSignup] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

  const signInUser = (user: User): void => {
    setCurrentUser(user);
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <FormContainer>
              {showSignup ? (
                <SignupForm signInUser={signInUser} />
              ) : (
                <SignInForm signInUser={signInUser} />
              )}
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
          <MainContainer>
            <Link to="/">Log out</Link>
            <ProfilePage user={currentUser} />
          </MainContainer>
        </Route>
        <Route path="/forgot-password">
          <div className="App">
            <FormContainer>
              <ForgotPassword />
            </FormContainer>
          </div>
        </Route>
        <Route path="/reset-password">
          <div className="App">
            <FormContainer>
              <ResetPassword />
            </FormContainer>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

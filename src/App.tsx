import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import SignupForm from "./forms/signupForm";
import FormContainer from "./containers/formContainer";
import MainContainer from "./containers/mainContainer";
import ProfilePage from "./components/profilePage";
import Sidebar from "./components/sidebar";
import "./App.css";
import SignInForm from "./forms/signInForm";
import ForgotPassword from "./forms/forgotPassword";
import ResetPassword from "./forms/resetPassword";
import { User } from "./interfaces/user";
import FormModal from "./containers/formModal";
import { Item } from "./interfaces/item";
import ItemDetails from "./components/itemDetails";

const { Sider, Content } = Layout;

type CurrentUser = User | null;
type CurrentForm = React.FC | null;
type CurrentItem = Item | null;

function App() {
  const [showSignup, toggleSignup] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [selectedForm, setSelectedForm] = useState<CurrentForm>(null);
  const [currentItem, setCurrentItem] = useState<CurrentItem>(null);

  const signInUser = (user: User): void => {
    setCurrentUser(user);
  };

  const signOutUser = (): void => {
    setCurrentUser(null);
  };

  const showFormModal = (selectedForm: React.FC): JSX.Element => {
    return (
      <FormModal
        formComponent={selectedForm}
        showForm={true}
        setSelectedForm={setSelectedForm}
      ></FormModal>
    );
  };
  return (
    <div className="body">
      <BrowserRouter>
        <Switch>
          <Layout style={{ height: "100vh" }}>
            <Sider collapsed={true} theme="light">
              <Sidebar
                loggedIn={currentUser ? true : false}
                userID={currentUser ? currentUser.id : 0}
                toggleSignup={toggleSignup}
                selectForm={setSelectedForm}
                signOut={signOutUser}
                lists={currentUser ? currentUser.lists : []}
                updateUser={setCurrentUser}
              />
            </Sider>
            <Layout>
              <Content>
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
                    {selectedForm ? showFormModal(selectedForm) : null}
                    <ProfilePage
                      user={currentUser}
                      selectItem={setCurrentItem}
                    />
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
                <Route path="/item-details">
                  <MainContainer>
                    {currentItem && currentUser ? (
                      <ItemDetails
                        item={currentItem}
                        list_id={currentUser.lists[0].id}
                        user_id={currentUser.id}
                        selectItem={setCurrentItem}
                        lists={currentUser.lists}
                        updateUser={setCurrentUser}
                      />
                    ) : (
                      <Redirect to="/profile" />
                    )}
                  </MainContainer>
                </Route>
              </Content>
            </Layout>
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

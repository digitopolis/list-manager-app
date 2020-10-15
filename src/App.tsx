import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import SignupForm from "./forms/signupForm";
import FormContainer from "./containers/formContainer";
import MainContainer from "./containers/mainContainer";
import ProfilePage from "./components/profilePage";
import MenuBar from "./components/menuBar";
import "./App.css";
import SignInForm from "./forms/signInForm";
import ForgotPassword from "./forms/forgotPassword";
import ResetPassword from "./forms/resetPassword";
import { User } from "./interfaces/user";
import FormModal from "./containers/formModal";
import { Item } from "./interfaces/item";
import ItemDetails from "./components/itemDetails";
import StatsPage from "./components/statsPage";
import { List } from "./interfaces/list";
import ListView from "./components/listView";

const { Sider, Content, Header } = Layout;

type CurrentUser = User | null;
type CurrentForm = React.FC | null;
type CurrentItem = Item | null;
type CurrentList = List | null;

const getWidth = (): number =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function App() {
  const [showSignup, toggleSignup] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [selectedForm, setSelectedForm] = useState<CurrentForm>(null);
  const [currentItem, setCurrentItem] = useState<CurrentItem>(null);
  const [currentList, setCurrentList] = useState<CurrentList>(null);
  const [windowWidth, setWindowWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      setWindowWidth(getWidth());
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

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

  const showSidebar = (): JSX.Element => {
    return (
      <Sider collapsed={true} theme="light">
        <MenuBar
          loggedIn={currentUser ? true : false}
          userID={currentUser ? currentUser.id : 0}
          toggleSignup={toggleSignup}
          selectForm={setSelectedForm}
          signOut={signOutUser}
          lists={currentUser ? currentUser.lists : []}
          updateUser={setCurrentUser}
          mode={"inline"}
          width={50}
        />
      </Sider>
    );
  };

  const showHeader = (): JSX.Element => {
    return (
      <Header style={{ background: "#fff" }}>
        <MenuBar
          loggedIn={currentUser ? true : false}
          userID={currentUser ? currentUser.id : 0}
          toggleSignup={toggleSignup}
          selectForm={setSelectedForm}
          signOut={signOutUser}
          lists={currentUser ? currentUser.lists : []}
          updateUser={setCurrentUser}
          mode={"horizontal"}
        />
      </Header>
    );
  };

  const showHeaderOrSidebar = (): JSX.Element => {
    if (windowWidth > 767) {
      return showSidebar();
    } else {
      return showHeader();
    }
  };

  return (
    <div className="body">
      <BrowserRouter>
        <Switch>
          <Layout style={{ height: "100vh" }}>
            {currentUser ? showHeaderOrSidebar() : null}
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
                      selectList={setCurrentList}
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
                    {selectedForm ? showFormModal(selectedForm) : null}
                    {currentItem && currentUser ? (
                      <ItemDetails
                        item={currentItem}
                        list_id={currentUser.lists[0].id}
                        user_id={currentUser.id}
                        selectItem={setCurrentItem}
                        userLists={currentUser.lists}
                        updateUser={setCurrentUser}
                      />
                    ) : (
                      <Redirect to="/profile" />
                    )}
                  </MainContainer>
                </Route>
                <Route path="/user-stats">
                  <MainContainer>
                    {selectedForm ? showFormModal(selectedForm) : null}
                    {currentUser ? (
                      <StatsPage user={currentUser} />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </MainContainer>
                </Route>
                <Route path="/list-view">
                  <MainContainer>
                    {selectedForm ? showFormModal(selectedForm) : null}
                    {currentList && currentUser ? (
                      <ListView
                        list={currentList}
                        selectItem={setCurrentItem}
                        selectList={setCurrentList}
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

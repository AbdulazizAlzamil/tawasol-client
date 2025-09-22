import { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Register from "./components/Users/Register";
import Alert from "./components/Alert";
import store from "./redux/store";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./utils";
import { loadUser } from "./redux/modules/users";
import Login from "./components/Users/Login";
import Private from "./components/Private";
import Home from "./components/Home";
import ProfileForm from "./components/ProfileForms/ProfileForm";
import AddEducation from "./components/ProfileForms/AddEducation";
import AddExperience from "./components/ProfileForms/AddExperience";
import Developers from "./components/Developers";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";

function App() {
  function AppInitializer({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
      const match = document.cookie.match(/token=([^;]+)/);
      const token = match ? match[1] : null;
      if (token) {
        setAuthToken(token);
      }
      dispatch(loadUser());
    }, [dispatch]);
    return children;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer>
          <Fragment>
            <Alert />
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Private component={Home} />} />
              <Route
                path="/create-profile"
                element={<Private component={ProfileForm} />}
              />
              <Route
                path="/add-education"
                element={<Private component={AddEducation} />}
              />
              <Route
                path="/add-experience"
                element={<Private component={AddExperience} />}
              />
              <Route
                path="/developers"
                element={<Private component={Developers} />}
              />
              <Route
                path="/profiles/:id"
                element={<Private component={Profile} />}
              />
              <Route
                path="/settings"
                element={<Private component={Settings} />}
              />
              <Route
                path="/edit-profile"
                element={<Private component={ProfileForm} />}
              />
              <Route
                path="/posts"
                element={<Private component={Posts} />}
              />
              <Route
                path="/posts/:id"
                element={<Private component={Post} />}
              />
            </Routes>
          </Fragment>
        </AppInitializer>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

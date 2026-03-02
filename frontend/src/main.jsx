import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  AuthLayout,
  Login,
  SignUp,
  AddPost,
} from "./components/index.js";
import Profile from "./components/pages/Profile.jsx";
import ProfilePosts from "./components/profile/ProfilePosts.jsx";
import ProfileReplies from "./components/profile/ProfileReplies.jsx";
import ProfileHighlights from "./components/profile/ProfileHighlights.jsx";
import ProfileArticles from "./components/profile/ProfileArticles.jsx";
import ProfileLikes from "./components/profile/ProfileLikes.jsx";
import ScrollToTop from "./components/Scroll/ScrollToTop.jsx";
import AuthInitializer from "./components/auth/AuthInitializer.jsx";
import Explore from "./components/pages/Explore.jsx";
import Notification from "./components/pages/Notification.jsx";
import Setting from "./components/pages/Setting.jsx";
import Bookmark from "./components/pages/Bookmark.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthInitializer>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout authentication>
                <App />
              </AuthLayout>
            }
          >
            <Route index element={<Home />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/profile/:username" element={<Profile />}>
              <Route index element={<ProfilePosts />} />
              <Route path="replies" element={<ProfileReplies />} />
              <Route path="highlights" element={<ProfileHighlights />} />
              <Route path="articles" element={<ProfileArticles />} />
              <Route path="likes" element={<ProfileLikes />} />
            </Route>
            <Route path="/explore" element={<div>{<Explore />} </div>} />
            <Route
              path="/notifications"
              element={
                <div>
                  <Notification />
                </div>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <div>
                  <Bookmark />
                </div>
              }
            />
            <Route
              path="/setting"
              element={
                <div>
                  {" "}
                  <Setting />
                </div>
              }
            />
          </Route>

          <Route
            path="/login"
            element={
              <AuthLayout authentication={false}>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout authentication={false}>
                <SignUp />
              </AuthLayout>
            }
          />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  </Provider>,
);

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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
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
          <Route
            index
            element={
              <AuthLayout authentication>
                <Home />
              </AuthLayout>
            }
          />
          <Route
            path="/add-post"
            element={
              <AuthLayout authentication>
                <AddPost />
              </AuthLayout>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <AuthLayout authentication>
                <Profile />
              </AuthLayout>
            }
          >
            <Route index element={<ProfilePosts />} />
            <Route path="replies" element={<ProfileReplies />} />
            <Route path="highlights" element={<ProfileHighlights />} />
            <Route path="articles" element={<ProfileArticles />} />
            <Route path="likes" element={<ProfileLikes />} />
          </Route>
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
    </BrowserRouter>
  </Provider>,
);

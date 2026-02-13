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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <AuthLayout authentication>
                <Home />
              </AuthLayout>
            }
          />
          <Route
            index
            path="/home"
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
    </BrowserRouter>
  </Provider>,
);

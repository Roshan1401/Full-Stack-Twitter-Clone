import "./App.css";
import LeftBar from "./components/Layout/LeftBar/LeftBar";
import Profile from "./components/pages/Profile";
// import Follows from "./components/RIghtBar/FollowComponent/Follows";
import RightBar from "./components/Layout/RIghtBar/RightBar";
// import { Login, SignUp, Home } from "./index";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  logout as authLogout,
  login as authLogin,
} from "./Redux/auth/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/user/getUser", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.status !== "error") {
          dispatch(authLogin({ userInfo: data }));
        } else {
          dispatch(authLogout());
        }
      } catch (error) {
        dispatch(authLogout());
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return !loading ? (
    <>
      <div className="main-container">
        <div className="component-container">
          <LeftBar />
          <main>
            <Profile />
          </main>
          <div className="rightBar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default App;

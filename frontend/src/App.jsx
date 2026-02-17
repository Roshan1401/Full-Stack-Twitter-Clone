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
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/getUser",
          {
            withCredentials: true,
          },
        );

        const data = res.data;
        const user = data.data;
        if (data.success) {
          console.log(data);

          dispatch(authLogin({ userInfo: user }));
        } else {
          dispatch(authLogout());
          navigate("/login");
          // console.log("Logout");
        }
      } catch (error) {
        dispatch(authLogout());
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return !loading ? (
    <>
      <div className="main-container">
        <div className="component-container">
          <div className="leftBar">
            <LeftBar />
          </div>
          <main>
            <Outlet />
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

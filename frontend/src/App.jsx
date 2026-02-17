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
  ) : (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <svg
        className="h-7 w-7 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        aria-label="Loading"
        role="img"
      >
        <path
          fill="rgba(116, 192, 252, 1)"
          d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8-79.3 23.6-137.1 97.1-137.1 184.1 0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256 512 397.4 397.4 512 256 512S0 397.4 0 256c0-116 77.1-213.9 182.9-245.4 16.9-5 34.8 4.6 39.8 21.5z"
        />
      </svg>
    </div>
  );
}

export default App;

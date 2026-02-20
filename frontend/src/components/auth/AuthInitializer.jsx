import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  logout as authLogout,
  login as authLogin,
} from "../../Redux/auth/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
          dispatch(authLogin({ userInfo: user }));
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
  }, [dispatch]);

  return loading ? null : children;
}

export default AuthInitializer;

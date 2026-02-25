import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  logout as authLogout,
  login as authLogin,
} from "../../Redux/auth/authSlice";
import { useApi } from "../../hooks/useApi.js";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { request } = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await request("GET", "/user/getUser");
        if (user) {
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
  }, [dispatch, request]);

  return loading ? null : children;
}

export default AuthInitializer;

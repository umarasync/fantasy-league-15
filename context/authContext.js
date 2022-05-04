import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Actions
import { me } from "redux/Auth/api";
import { meFailed, meSuccess } from "redux/Auth/actionCreators";

// Constants
import {
  authRoutes,
  homeRoute1,
  homeRoute2,
  publicRoutes,
} from "constants/universalConstants";
import { isEmpty } from "lodash/lang";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = useSelector(({ auth }) => auth.user);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const checkIfTokenIsValid = async () => {
    const { success, data } = await dispatch(me());
    if (success) {
      setLoading(false);
      // If already signed in and trying to access login/register page, then redirect to some homepage
      if (authRoutes.includes(router.pathname)) {
        if (data.fantasyTeamId) {
          return router.push(homeRoute2);
        }
        return router.push(homeRoute1);
      } else {
        return router.push(router.pathname);
      }
    }

    setLoading(false);

    if (authRoutes.includes(router.pathname)) {
      return router.push(router.pathname);
    }
    return router.push("/sign_in");
  };
  useEffect(() => {
    checkIfTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !isEmpty(user), user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

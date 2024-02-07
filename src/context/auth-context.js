import React, { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState();
  const [isLoading, setIsLoading] = useState();
  const [loginUser] = useAxios();

  const login = async (email, password, handleError) => {
    setIsLoading(true);
    try {
      const res = await loginUser({
        method: "POST",
        url: "/login",
        requestConfig: { email, password }
      });
      if (res?.data?.token) {
        localStorage.setItem("userToken", res.data.token);
        setUserToken(res.data.token);
      } else {
        handleError ? handleError() : console.log(res);
      }
    } catch (error) {
      console.error("Login error:", error);
      handleError && handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUserToken(null);
      await localStorage.removeItem("userToken");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const userToken = await localStorage.getItem("userToken");
      setUserToken(userToken);
    } catch (error) {
      console.error("IsLoggedIn error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

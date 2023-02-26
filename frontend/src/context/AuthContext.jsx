import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  token: {},
  role: "",
  isLoggedIn: false,
  class: "",
  login: (role, token, classId) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  var decoded;

  if (initialToken != null) {
    decoded = jwt_decode(initialToken);
  }

  const [authDetails, setAuthDetails] = useState({
    token: initialToken,
    role: decoded != null ? decoded["role"] : null,
    class: decoded != null ? (decoded["class"] != null ? decoded["class"] : null) : null
  });

  const userIsLoggedIn = !!authDetails.token;

  const loginHandler = (role, token, classId) => {
    setAuthDetails({ token: token, role: role, class: classId });
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setAuthDetails({ token: "", role: [], class: "" });
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: authDetails.token,
    role: authDetails.role,
    class: authDetails.class,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

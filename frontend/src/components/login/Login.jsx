import React, { useContext, useState } from "react";
import "./login.css";
import { UserLogin } from "../../services/AuthService";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const loginResponse = await UserLogin(credentials["username"], credentials["password"]);
    if (loginResponse.success) {
      authCtx.login(loginResponse.role, loginResponse.token, loginResponse.class);
      navigate(from, { replace: true });
    } else {
      toast.error("Incorrent Username or Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <form>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <input type="text" className="form-control" name="username" placeholder="Username" onChange={handleChange} defaultValue={credentials["username"]} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} defaultValue={credentials["password"]} />
          </div>
          <div className="form-group">
            <button type="submit" onClick={onLoginHandler} className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
        </form>
      </div>
      <ToastContainer theme="colored" position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};
// onClick={onLoginHandler}
export default Login;

import React, { useState } from "react";
import "./Login.css";
import Logo from "../../Image/Letter-s-logo.png";

import { useDispatch, useSelector } from "react-redux";

import { adminLogin } from "../../Actions/authAction";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.adminAuthReducer.loading);
  const adminData = useSelector((state) => state.adminAuthReducer.authData);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(data));
  };
  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Spice App</h1>
          <h6>Connecting world</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Login</h3>
          
          <div className="inputfields">
            <div className="inputname">
              <input
                type="text"
                placeholder="Email"
                className="infoInput"
                name="username"
                id="username"
                value={data.username}
                onChange={handleChange}
                
              />
            </div>
          </div>
          <div className="inputfields">
            <div className="inputname">
              <input
                type="password"
                placeholder="Password"
                className="infoInput"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                
              />
            </div>
          </div>
          <div>
            <button
              className="button infoButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

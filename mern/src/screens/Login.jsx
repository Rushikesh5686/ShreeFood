import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://shreefood.onrender.com/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("useremail", json.email);
        navigate("/"); // Navigate to the home page
      } else {
        alert(`Error: ${json.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-4 p-4 rounded shadow-lg bg-dark text-white">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-transparent text-white"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-white"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Submit
          </button>

          <div className="d-flex justify-content-center">
            <Link to="/createuser" className="btn btn-danger">
             New User ? Create Account
            </Link>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

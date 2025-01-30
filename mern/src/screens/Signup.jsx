import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [address, setAddress] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Get the user's geolocation
      const navLocation = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

      const position = await navLocation();
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      console.log("Latitude:", lat, "Longitude:", long);

      // Send latitude and longitude to the backend
      const response = await fetch("https://shreefood.onrender.com/api/auth/getlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latlong: { lat, long } }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.statusText}`);
      }

      const { location } = await response.json();

      if (location) {
        console.log("Fetched location:", location);
        setAddress(location); // Update the address field
        setCredentials({ ...credentials, location }); // Sync with form data
      } else {
        alert("Unable to fetch the location. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location. Please check your connection or try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-75 p-4 shadow-lg bg-dark text-white rounded">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <h2 className="text-center mb-4">Create Account</h2>
          <form>
            {/* Name Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control bg-transparent text-white"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-0">
              <label htmlFor="email" className="form-label">Email address</label>
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

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
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

             

             

            {/* Submit Button */}
            <div className="d-flex justify-content-between mb-3">
              <button type="submit" className="btn btn-success w-100 w-md-auto">
                Submit
              </button>
            </div>

            {/* Already a User Link */}
            <div className="col-12 text-center mt-3">
              <Link to="/login" className="btn btn-danger w-100">
                Already a User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

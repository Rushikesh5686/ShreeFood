import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import Modal from "../model";
import { Link, useNavigate } from 'react-router-dom';
import Cart from "../screens/Cart";
import { usecart } from "./contextreducer";

function Navbar() {
  const [cartview, setcartview] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  let dataa = usecart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Shree Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" // Corrected to target the collapsible nav section
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>

            {/* Login/Signup or Cart/Logout buttons depending on authentication */}
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex flex-column flex-lg-row">
                <Link className="btn bg-white text-success mx-1 mb-2 mb-lg-0" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                {/* Cart Button */}
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => setcartview(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {dataa.length > 0 ? dataa.length : ""}
                  </Badge>
                </div>

                {/* Cart Modal */}
                {cartview ? <Modal onClose={() => setcartview(false)}><Cart /></Modal> : null}

                {/* Logout Button */}
                <div className="btn bg-white text-danger mx-2" onClick={handlelogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

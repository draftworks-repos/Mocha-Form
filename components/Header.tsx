import React from "react";
import { MapPin } from "lucide-react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Left Section: Logo & Location */}
        <div className="header-left">
          {/* Logo Replica */}
          <a href="/" style={{ textDecoration: "none" }}>
            <div className="logo-wrapper">
              <span className="logo-main">Mocha</span>
              <span className="logo-sub">by Scale Media</span>
            </div>
          </a>

          {/* Location Picker */}
          <div className="location-picker">
            <div className="icon-circle">
              <MapPin className="location-icon" />
            </div>
            <div className="location-text">
              <span className="city-name">Kolkata</span>
              <span className="state-name">West Bengal</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <button className="mobile-login-btn">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

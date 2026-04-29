import { useState } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import "./Header.css"
type HeaderProps = {
  name: string;
  onLogout: () => void;
};

export default function Header({ name, onLogout }: HeaderProps) {
  const [active, setActive] = useState("dashboard");

  const navItems = ["Dashboard", "Analytics", "Activity", "Chat", "Account"];

  return (
    <header className="header-container">

      <div className="logo">
        <span className="logo-icon"></span>
        <span className="logo-text">Synapse</span>
      </div>

      <div className="nav-wrapper">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-pill ${
              active === item.toLowerCase() ? "active" : ""
            }`}
            onClick={() => setActive(item.toLowerCase())}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="profile-section">
        <div className="icon-btn"><FiBell /></div>
        <div className="icon-btn"><FiSettings /></div>

        <div className="avatar">
          {name?.charAt(0).toUpperCase()}
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
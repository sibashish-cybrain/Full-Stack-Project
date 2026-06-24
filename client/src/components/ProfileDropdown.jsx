import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Services/authServices";
import "./ProfileDropdown.css";

/**
 * ProfileDropdown
 * Props:
 *   user: { name: string, email: string } | null
 */

// Small inline SVG icons (Feather-style, stroke-based, dependency-free)
const ProfileIcon = () => (
  <svg className="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  function goTo(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <div className="profile-wrap" ref={wrapRef}>
      <div
        className={`profile-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        <span className="welcome-text">
          Welcome, <strong>{user?.name}</strong>
        </span>
        <span className="caret"></span>
      </div>

      <div className={`dropdown ${open ? "show" : ""}`} role="menu">
        <div className="dropdown-header">
          <div className="avatar">{initial}</div>
          <div>
            <div className="name">{user?.name || "Loading..."}</div>
            <div className="email" title={user?.email || ""}>
              {user?.email || ""}
            </div>
          </div>
        </div>

        <div className="dropdown-list">
          <button
            className="dropdown-item"
            role="menuitem"
            onClick={() => goTo("/profile")}
          >
            <ProfileIcon /> Profile
          </button>
          <button
            className="dropdown-item"
            role="menuitem"
            onClick={() => goTo("/settings")}
          >
            <SettingsIcon /> Settings
          </button>

          <div className="dropdown-divider" />

          <button
            className="dropdown-item logout-btn"
            role="menuitem"
            onClick={handleLogout}
          >
            <LogoutIcon /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDropdown;
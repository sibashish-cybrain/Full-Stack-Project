import { useEffect, useState } from "react";
import { getProfile } from "../Services/authServices";
import ProfileDropdown from "./ProfileDropdown";
import "./Topbar.css";

function Topbar({ pageTitle = "Dashboard" }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
  <div className="topbar">

    <h1>{pageTitle}</h1>

    <div className="topbar-right">

      <div className="profile-wrapper">
        <ProfileDropdown user={user} />
      </div>

    </div>

  </div>
);
}

export default Topbar;
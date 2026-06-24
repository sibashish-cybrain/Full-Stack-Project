import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "⌂" },
  { label: "Employees", path: "/employees", icon: "⚇" },
  { label: "Attendance", path: "/attendance", icon: "▦" },
  { label: "Leave", path: "/leave", icon: "▤" },
  { label: "Payroll", path: "/payroll", icon: "▣" },
  { label: "Reports", path: "/reports", icon: "▥" },
  { label: "Settings", path: "/settings", icon: "⚙" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">HRMS</div>

      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="icon">{item.icon}</span> {item.label}
        </NavLink>
      ))}

      <div className="sidebar-spacer" />
    </aside>
  );
}

export default Sidebar;
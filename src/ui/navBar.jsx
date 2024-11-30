import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const user = useSelector((state) => state.userState);
  return (
    <nav className="nav-container">
      <div className="navheader">
        <p>
          <b>User:</b> {user.name}
        </p>
        <p>
          <b>Department:</b> {user.department}
        </p>
      </div>
      <div className="links-container">
        <ul>
          {user.department != "center" ? (
            <li>
              <NavLink to="employee/list">Employees</NavLink>
            </li>
          ) : null}
          {user.department != "center" ? (
            <li>
              <NavLink to="payroll/list">Payroll</NavLink>
            </li>
          ) : null}
          {user.department == "center" ? (
            <li>
              <NavLink to="globalComponent/list">Global Components</NavLink>
            </li>
          ) : null}
          {user.department == "center" ? (
            <li>
              <NavLink to="users">Users</NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

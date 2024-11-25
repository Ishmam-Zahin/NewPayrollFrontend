import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const department = useSelector((state) => state.userState.department);
  return (
    <nav className="nav-container">
      <div className="navheader">
        <p>
          <b>User:</b> zahin
        </p>
        <p>
          <b>Department:</b> center
        </p>
      </div>
      <div className="links-container">
        <ul>
          {department != "center" ? (
            <li>
              <NavLink to="employee/list">Employees</NavLink>
            </li>
          ) : null}
          {department != "center" ? (
            <li>
              <NavLink to="payroll/list">Payroll</NavLink>
            </li>
          ) : null}
          {department == "center" ? (
            <li>
              <NavLink to="globalComponent/list">Global Components</NavLink>
            </li>
          ) : null}
          {department == "center" ? (
            <li>
              <NavLink to="users">Users</NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

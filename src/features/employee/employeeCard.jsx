import { Link } from "react-router-dom";

export default function EmployeeCard({ employee, no, token }) {
  return (
    <div className="employeeCard">
      <div className="identity-container">
        <img
          src={
            employee.image_url === null
              ? "/images/employeephoto.png"
              : employee.image_url
          }
          alt="images/employeephoto.png"
        />
        <div>
          <h3>
            {employee.first_name} {employee.last_name}
          </h3>
          <h5>{employee.employee_type}</h5>
          <h5>{employee.email}</h5>
        </div>
      </div>
      <div>
        <h4>{employee.department.toUpperCase()}</h4>
      </div>
      <div>
        <h4>{employee.on_leave ? "YES" : "NO"}</h4>
      </div>
      <div>
        <Link to={`/employee/detail/${employee.id}`}>
          <button className="btn btn-green btn-small">VIEW</button>
        </Link>
        <button className="btn btn-red btn-small">DELETE</button>
      </div>
    </div>
  );
}

import { useReducer } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import getDepartment from "../../helper/getDepartment";
import CreateEmployeeButton from "./createButton";
import EditEmployeeButton from "./editButton";

const defaultInitialState = {
  first_name: "",
  last_name: "",
  gender: "male",
  employee_type: "",
  relegion: "islam",
  phone: "",
  email: "",
  job_grade: "",
  basic_pay: 0,
  on_leave: false,
  skip_loan: false,
  payroll: true,
  image_url: null,
  department: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "change/fName":
      return { ...state, first_name: action.payload };
    case "change/lName":
      return { ...state, last_name: action.payload };
    case "change/gender":
      return { ...state, gender: action.payload };
    case "change/employeeType":
      return { ...state, employee_type: action.payload };
    case "change/relegion":
      return { ...state, relegion: action.payload };
    case "change/phone":
      return { ...state, phone: action.payload };
    case "change/email":
      return { ...state, email: action.payload };
    case "change/jobGrade":
      return { ...state, job_grade: action.payload };
    case "change/basicPay":
      return { ...state, basic_pay: parseInt(action.payload) };
    case "change/onLeave":
      return { ...state, on_leave: action.payload };
    case "change/skipLoan":
      return { ...state, skip_loan: action.payload };
    case "change/payroll":
      return { ...state, payroll: action.payload };
    case "change/department":
      return { ...state, department: action.payload };
    default:
      throw Error("Unknown Action");
  }
}

export default function CreateEmployeeForm({ data, setVisible, token }) {
  var defaultState = defaultInitialState;

  if (data != null) {
    defaultState = { ...data };
    delete defaultState["id"];
    delete defaultState["globalComponents"];
    defaultState["department"] = defaultState["department"]["id"];
  }
  const [employee, dispatch] = useReducer(reducer, defaultState);
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getDpt"],
    queryFn: () => getDepartment({ token }),
  });
  if (isLoading) {
    return (
      <div className="floating-form">
        <h2>
          {data === null ? "Create New Employee" : "Edit The Employee"}
          <button
            onClick={() => setVisible(false)}
            className="btn btn-red btn-small cancel-btn"
          >
            cancel
          </button>
        </h2>
        Loading..
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return (
      <div className="floating-form">
        <h2>
          {data === null ? "Create New Employee" : "Edit The Employee"}
          <button
            onClick={() => setVisible(false)}
            className="btn btn-red btn-small cancel-btn"
          >
            cancel
          </button>
        </h2>
        Error
      </div>
    );
  }
  return (
    <div className="floating-form-container">
      <div className="floating-form">
        <div className="header-container">
          <h2>
            {data === null ? "Create New Employee" : "Edit The Employee"}
            <button
              onClick={() => setVisible(false)}
              className="btn btn-red btn-small cancel-btn"
            >
              &times;
            </button>
          </h2>
        </div>
        <div className="form-grid">
          <div>
            <label for="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={employee.first_name}
              placeholder="First Name"
              onChange={(e) =>
                dispatch({ type: "change/fName", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              value={employee.last_name}
              placeholder="Last Name"
              onChange={(e) =>
                dispatch({ type: "change/lName", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="employee-type">Employee Type</label>
            <input
              id="employee-type"
              type="text"
              value={employee.employee_type}
              placeholder="Employee Type"
              onChange={(e) =>
                dispatch({
                  type: "change/employeeType",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label for="phone-number">Phone Number</label>
            <input
              id="phone-number"
              type="text"
              value={employee.phone}
              placeholder="Phone Number"
              onChange={(e) =>
                dispatch({ type: "change/phone", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              type="text"
              value={employee.email}
              placeholder="Email"
              onChange={(e) =>
                dispatch({ type: "change/email", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="job-grade">Job Grade</label>
            <input
              id="job-grade"
              type="text"
              value={employee.job_grade}
              placeholder="Job Grade"
              onChange={(e) =>
                dispatch({ type: "change/jobGrade", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="main-payscale">Main Payscale</label>
            <input
              id="main-payscale"
              type="number"
              value={employee.basic_pay}
              placeholder="Main Payscale"
              onChange={(e) =>
                dispatch({ type: "change/basicPay", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label for="gender">Gender</label>
            <select
              id="gender"
              value={employee.gender}
              onChange={(e) =>
                dispatch({ type: "change/gender", payload: e.target.value })
              }
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label for="religion">Religion</label>
            <select
              id="religion"
              value={employee.relegion}
              onChange={(e) =>
                dispatch({ type: "change/relegion", payload: e.target.value })
              }
            >
              <option value="islam">Islam</option>
              <option value="hindu">Hindu</option>
              <option value="christian">Christian</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label for="leaveId">OnLeave: </label>
            <select
              id="leaveId"
              value={employee.on_leave}
              onChange={(e) =>
                dispatch({ type: "change/onLeave", payload: e.target.value })
              }
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div>
            <label for="payrollId">Payroll: </label>
            <select
              id="payrollId"
              value={employee.payroll}
              onChange={(e) =>
                dispatch({ type: "change/payroll", payload: e.target.value })
              }
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div>
            <label for="skiploanId">SkipLoan: </label>
            <select
              id="skiploanId"
              value={employee.skip_loan}
              onChange={(e) =>
                dispatch({ type: "change/skipLoan", payload: e.target.value })
              }
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div>
            <label for="department">Department</label>
            <select
              id="department"
              value={employee.department}
              onChange={(e) =>
                dispatch({ type: "change/department", payload: e.target.value })
              }
            >
              {departments.map((dept, index) => (
                <option value={dept.id} key={index}>
                  {dept.code_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {data == null ? (
          <CreateEmployeeButton
            employee={employee}
            token={token}
            setVisible={setVisible}
          />
        ) : (
          <EditEmployeeButton
            token={token}
            employee={employee}
            id={data.id}
            setVisible={setVisible}
          />
        )}
      </div>
    </div>
  );
}

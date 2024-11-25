import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import getEmployeeList from "../../helper/getEmployeeList";
import EmployeeCard from "./employeeCard";
import NewEmployee from "./newEmployee";

export default function EmployeeList() {
  const token = useSelector((state) => state.userState.token);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["employeeList"],
    queryFn: () => getEmployeeList({ token }),
  });
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }
  return (
    <div className="main-area">
      <h1>EmployeeList</h1>
      <NewEmployee token={token} />
      <div className="employeeCard employeeheader">
        <div>Identitiy</div>
        <div>Department</div>
        <div>On Leave</div>
        <div>Actions</div>
      </div>
      {data.map((employee, index) => (
        <EmployeeCard
          employee={employee}
          no={index + 1}
          token={token}
          key={employee.id}
        />
      ))}
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import getPayslipDetail from "../../helper/getPayslipDetail";

export default function PayslipDetails() {
  const { payslipId } = useParams();
  const token = useSelector((state) => state.userState.token);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payslipDetail"],
    queryFn: () => getPayslipDetail({ token, payslipId }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <div className="main-area">
      <h2>Payslip Details</h2>
      <div>
        <p>
          <b>Name: </b>
          {data["name"]}
        </p>
        <p>
          <b>Department: </b>
          {data["department_name"]}
        </p>
        <p>
          <b>Date: </b>
          {data["date"]}
        </p>
        <p>
          <b>From: </b> {data["from_date"]} {"  "}
          <b>to</b> {data["to_date"]}
        </p>
        <p>
          <b>Main Payscale: </b>
          {data["main_payscale"]}
        </p>
        <p>
          <b>Final Amount: </b>
          {data["final_amount"]}
        </p>
      </div>
      <h4>Details</h4>
      <div>
        <h3>Compensations</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data["description"]["compensations"].map((obj, index) => {
              return (
                <tr key={index}>
                  <td>0{index + 1}</td>
                  <td>{obj["name"]}</td>
                  <td>{obj["amount"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Deductions</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data["description"]["deductions"].map((obj, index) => {
              return (
                <tr key={index}>
                  <td>0{index + 1}</td>
                  <td>{obj["name"]}</td>
                  <td>{obj["amount"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

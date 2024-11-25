import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useReducer, useState } from "react";

import { NavLink } from "react-router-dom";

import calculatePayroll from "../../helper/calculatePayroll";
import getPayslips from "../../helper/getPayslips";

const defaultState = {
  from_date: "",
  to_date: "",
  isEid: false,
  isPuja: false,
  isNewYear: false,
  isChristmas: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "change/fromDate":
      return { ...state, from_date: action.payload };
    case "change/toDate":
      return { ...state, to_date: action.payload };
    case "change/isEid":
      return { ...state, isEid: action.payload };
    case "change/isPuja":
      return { ...state, isPuja: action.payload };
    case "change/isNewYear":
      return { ...state, isNewYear: action.payload };
    case "change/isChristmas":
      return { ...state, isChristmas: action.payload };
    default:
      throw Error("Unknown action");
  }
}

export default function PayrollList() {
  const token = useSelector((state) => state.userState.token);
  const [visible, setVisible] = useState(false);
  const [data, dispatch] = useReducer(reducer, defaultState);
  const queryClient = useQueryClient();
  const {
    mutate,
    error,
    isPending,
    isError,
    data: data2,
  } = useMutation({
    mutationFn: calculatePayroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payslipList"] });
      setVisible(false);
    },
  });
  const {
    data: payslips,
    isLoading,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryKey: ["payslipList"],
    queryFn: () => getPayslips({ token }),
  });

  if (isError2) {
    console.log(error2);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="main-area">
      <h1>Calculate Payroll</h1>
      <button className="btn btn-green" onClick={() => setVisible(true)}>
        CALCULATE PAYROLL
      </button>
      {visible ? (
        <div className="floating-form">
          <h2>
            Payroll
            <button
              className="btn btn-red btn-small"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
          </h2>
          <div>
            <label htmlFor="fromDate">From Date:</label>
            <input
              id="fromDate"
              type="date"
              value={data.from_date}
              onChange={(e) =>
                dispatch({ type: "change/fromDate", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date:</label>
            <input
              id="toDate"
              type="date"
              value={data.to_date}
              onChange={(e) =>
                dispatch({ type: "change/toDate", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="isEid">Eid</label>
            <select
              id="isEid"
              value={data.isEid}
              onChange={(e) =>
                dispatch({ type: "change/isEid", payload: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="isPuja">Puja</label>
            <select
              id="isPuja"
              value={data.isPuja}
              onChange={(e) =>
                dispatch({ type: "change/isPuja", payload: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="isChristmas">Christmas</label>
            <select
              id="isChristmas"
              value={data.isChristmas}
              onChange={(e) =>
                dispatch({
                  type: "change/isChristmas",
                  payload: e.target.value,
                })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="isNewYear">New Year</label>
            <select
              id="isNewYear"
              value={data.isNewYear}
              onChange={(e) =>
                dispatch({
                  type: "change/isNewYear",
                  payload: e.target.value,
                })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button
            disabled={isPending}
            className="btn btn-green"
            onClick={() => mutate({ token, data })}
          >
            {isPending ? "Loading..." : "CALCULATE"}
          </button>
        </div>
      ) : null}
      <h2>Payslips</h2>
      <div className="payslip-card payslip-card-header">
        <div>Name</div>
        <div>From Date</div>
        <div>To Date</div>
        <div>Action</div>
      </div>
      {payslips.map((payslip, index) => {
        return (
          <div key={index} className="payslip-card">
            <div>{payslip["name"]}</div>
            <div>{payslip["from_date"]}</div>
            <div>{payslip["to_date"]}</div>
            <div>
              <NavLink to={`/payslip/details/${payslip["id"]}`}>
                <button className="btn btn-green btn-small">VIEW</button>
              </NavLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}

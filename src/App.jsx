import AppLayout from "./ui/appLayout";
import HomePage from "./ui/HomePage";
import MainLayout from "./ui/mainLayout";
import Profile from "./ui/profile";
import UserMain from "./features/user/userMain";
import DepartmentMain from "./features/department/departMain";
import GlobalComponentList from "./features/globalComponents/globalComponentList";
import GlobalComponentDetail from "./features/globalComponents/globalComponentDetail";
import EmployeeList from "./features/employee/employeeList";
import EmployeeDetail from "./features/employee/employeeDetail";
import PayrollList from "./features/payroll/payrollList";
import PayslipDetails from "./features/payroll/payslipDetails";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <Profile />,
          },
          {
            path: "departments",
            element: <DepartmentMain />,
          },
          {
            path: "users",
            element: <UserMain />,
          },
          {
            path: "globalComponent/list",
            element: <GlobalComponentList />,
          },
          {
            path: "globalComponent/detail/:id",
            element: <GlobalComponentDetail />,
          },
          {
            path: "employee/list",
            element: <EmployeeList />,
          },
          {
            path: "employee/detail/:employeeId",
            element: <EmployeeDetail />,
          },
          {
            path: "payroll/list",
            element: <PayrollList />,
          },
          {
            path: "payslip/details/:payslipId",
            element: <PayslipDetails />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

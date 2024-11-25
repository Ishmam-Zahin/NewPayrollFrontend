import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";

import NavBar from "./navBar";

export default function MainLayout() {
  const department = useSelector((state) => state.userState.department);

  if (department === null) {
    return <main>You need to login</main>;
  }
  return (
    <main className="main-container">
      <NavBar />
      <Outlet />
    </main>
  );
}

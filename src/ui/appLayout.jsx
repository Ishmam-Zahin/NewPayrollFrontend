import Header from "./header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

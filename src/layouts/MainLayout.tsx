import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="  mx-auto w-full">
        <Outlet />
      </div>
    </>
  );
}

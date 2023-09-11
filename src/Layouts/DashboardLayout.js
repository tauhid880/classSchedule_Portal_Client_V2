import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import useRole from "../Hook/UseRole";
import AdminOption from "../Pages/Admin/AdminOption";
import { AuthContext } from "../Contexts/AuthProvider";
import FacultyOption from "../Pages/Faculty/FacultyOption";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(user?.email);

  return (
    <section className="flex min-h-screen">
      {role === "Admin" ? (
        <AdminOption></AdminOption>
      ) : (
        <FacultyOption></FacultyOption>
      )}
      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </section>
  );
};

export default DashboardLayout;

import React from "react";
import { Drawer } from "../components";
import { Outlet } from "react-router-dom";

const ParentAccountLayout = () => {
  return (
    <Drawer>
      {/* <Navbar /> */}
      <Outlet />
    </Drawer>
  );
};

export default ParentAccountLayout;

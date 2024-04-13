import React from "react";
import { Navbar } from "../components";

const AccountLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default AccountLayout;

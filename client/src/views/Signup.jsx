import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const Signup = () => {
  return (
    <MainLayout>
      <div
        className="hero min-h-screen bg-base-200 bg-opacity-60"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;

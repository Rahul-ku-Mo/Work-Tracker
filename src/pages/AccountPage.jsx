import React from "react";
import Account from "../components/Account";
import { Outlet } from "react-router-dom";

const AccountPage = () => {
  return (
    <>
      <Account>
        <Outlet />
      </Account>
    </>
  );
};

export default AccountPage;

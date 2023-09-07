import React from "react";
import UserManagement from "./UserManagement";
import UserBar from "../Login/UserBar";

const AdminDisplay = () => {
  return (
    <div>
      <UserBar></UserBar>
      Admin Display Page
      <UserManagement></UserManagement>
    </div>
  );
};

export default AdminDisplay;

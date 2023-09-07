import React from "react";
import UserManagement from "./UserManagement";
import UserBar from "../Login/UserBar";

const AdminDisplay = () => {
  return (
    <div>
      <UserBar></UserBar>
      <h3>Admin Display Page</h3>
      <UserManagement></UserManagement>
    </div>
  );
};

export default AdminDisplay;

import React from "react";
import SizeAdd from "./SizeAdd";
import SizeView from "./SizeView";
import { Typography } from "@mui/material";

const SizeManagement = () => {
  return (
    <>
      <Typography variant="h5">Size Management</Typography>
      <SizeAdd></SizeAdd>
      <SizeView></SizeView>
    </>
  );
};

export default SizeManagement;

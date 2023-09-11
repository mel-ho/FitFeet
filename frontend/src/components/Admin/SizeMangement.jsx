import React from "react";
import SizeAdd from "./SizeAdd";
import SizeView from "./SizeView";
import SizeSelect from "./SizeSelect";
import { Typography } from "@mui/material";

const SizeManagement = () => {
  return (
    <div>
      <Typography variant="h5">Size Management</Typography>
      <SizeAdd></SizeAdd>
      <SizeView></SizeView>
      <SizeSelect></SizeSelect>
    </div>
  );
};

export default SizeManagement;

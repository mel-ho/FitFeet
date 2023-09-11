import React from "react";
import ModelAdd from "./ModelAdd";
import ModelView from "./ModelView";
import { Typography } from "@mui/material";

const ModelManagement = () => {
  return (
    <>
      <Typography variant="h5">Model Management</Typography>
      <ModelAdd></ModelAdd>
      <ModelView></ModelView>
    </>
  );
};

export default ModelManagement;

import React from "react";
import ModelAdd from "./ModelAdd";
import ModelView from "./ModelView";
import ModelSelect from "./ModelSelect";
import { Typography } from "@mui/material";

const ModelManagement = () => {
  return (
    <div>
      <Typography variant="h5">Model Management</Typography>
      <ModelAdd></ModelAdd>
      <ModelView></ModelView>
      <ModelSelect></ModelSelect>
    </div>
  );
};

export default ModelManagement;

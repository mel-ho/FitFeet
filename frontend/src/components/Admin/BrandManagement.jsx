import React from "react";
import BrandAdd from "./BrandAdd";
import BrandView from "./BrandView";
import BrandSelect from "./BrandSelect";
import { Typography } from "@mui/material";

const BrandManagement = () => {
  return (
    <div>
      <Typography variant="h5">Brand Management</Typography>
      <BrandAdd></BrandAdd>
      <BrandView></BrandView>
      <BrandSelect></BrandSelect>
    </div>
  );
};

export default BrandManagement;

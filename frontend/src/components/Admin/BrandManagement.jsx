import React from "react";
import BrandAdd from "./BrandAdd";
import BrandView from "./BrandView";
import { Typography } from "@mui/material";

const BrandManagement = () => {
  return (
    <>
      <Typography variant="h5">Brand Management</Typography>
      <BrandAdd></BrandAdd>
      <BrandView></BrandView>
    </>
  );
};

export default BrandManagement;

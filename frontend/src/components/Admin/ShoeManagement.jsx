import React from "react";
import BrandAdd from "./BrandAdd";
import ModelAdd from "./ModelAdd";
import SizeAdd from "./SizeAdd";
import ShoeAdd from "./ShoeAdd";
import { Box, Paper, Typography } from "@mui/material";

const ShoeManagement = () => {
  return (
    <>
      <Box>
        <Paper>
          <br />
          <Typography variant="h6">Add a New Shoe...</Typography>
          <ShoeAdd></ShoeAdd>
          <br />
        </Paper>
      </Box>
      <br />
      <br />
      <Box>
        <Paper>
          <br />
          <Typography variant="h6">Brand/Model/Size doesn't exist?</Typography>
          <br /> Add a New Brand
          <BrandAdd></BrandAdd>
          Add a New Model
          <ModelAdd></ModelAdd>
          Add a New Size
          <SizeAdd></SizeAdd>
          <br />
        </Paper>
      </Box>
    </>
  );
};

export default ShoeManagement;

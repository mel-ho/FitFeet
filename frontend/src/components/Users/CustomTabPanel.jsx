import React from "react";
import { Box } from "@mui/material";

const CustomTabPanel = ({ value, index, children }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </Box>
  );
};

export default CustomTabPanel;

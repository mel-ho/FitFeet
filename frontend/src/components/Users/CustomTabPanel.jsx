import React from "react";
import { Box } from "@mui/material";

const CustomTabPanel = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`custom-tabpanel-${index}`}
      aria-labelledby={`custom-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default CustomTabPanel;

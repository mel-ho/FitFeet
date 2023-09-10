import React, { useState } from "react";
import { Box, Grid, Tabs, Tab } from "@mui/material";
import CustomTabPanel from "../Users/CustomTabPanel";

import Orders from "./Orders";
import Products from "./Products";
import RetailerProfile from "./RetailerProfile";
import UserBar from "../Login/UserBar";

const RetailerDisplay = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <div>
      <UserBar></UserBar>
      <h2>Retailer Display Page</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            "highlight item 1"
          </Grid>
          <Grid item xs={4}>
            "highlight item 2"
          </Grid>
          <Grid item xs={4}>
            "highlight item 3"
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Orders" {...a11yProps(0)} />
          <Tab label="Products" {...a11yProps(1)} />
          <Tab label="Retailer Profile" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Orders></Orders>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Products></Products>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RetailerProfile></RetailerProfile>
      </CustomTabPanel>
    </div>
  );
};

export default RetailerDisplay;

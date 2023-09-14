import React, { useState } from "react";
import { Box, Grid, Tabs, Tab, Container, Stack } from "@mui/material";
import CustomTabPanel from "../Users/CustomTabPanel";

import RetailerOrders from "./RetailerOrders";
import ProductView from "./ProductView";
import ProductAdd from "./ProductAdd";
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
    <Stack direction="column" spacing={3}>
      <Container>
        <UserBar></UserBar>
      </Container>
      <Container>
        <h2>Retailer Display Page</h2>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Products" {...a11yProps(1)} />
            <Tab label="Add Products" {...a11yProps(2)} />
            <Tab label="Retailer Profile" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <RetailerOrders></RetailerOrders>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProductView></ProductView>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ProductAdd></ProductAdd>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <RetailerProfile></RetailerProfile>
        </CustomTabPanel>
      </Container>
    </Stack>
  );
};

export default RetailerDisplay;

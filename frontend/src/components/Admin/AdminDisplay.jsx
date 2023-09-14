import React, { useState } from "react";
import UserManagement from "./UserManagement";
import UserBar from "../Login/UserBar";
import ShoeView from "./ShoeView";
import BrandView from "./BrandView";
import ModelView from "./ModelView";
import ShoeManagement from "./ShoeManagement";
import { Box, Tabs, Tab, Container, Stack } from "@mui/material";
import CustomTabPanel from "../Users/CustomTabPanel"; // Import your CustomTabPanel component

const AdminDisplay = () => {
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
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <Stack direction="column" spacing={3}>
        <Container>
          <UserBar></UserBar>
        </Container>
        <Container sx={{ width: "90vw", boxSizing: "border-box", p: 0, m: 0 }}>
          <h2>Admin Display Page</h2>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User Management" {...a11yProps(0)} />
              <Tab label="View All Shoes" {...a11yProps(1)} />
              <Tab label="View All Brands" {...a11yProps(2)} />
              <Tab label="View All Models" {...a11yProps(3)} />
              <Tab label="Add Shoe Details" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UserManagement />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ShoeView />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <BrandView />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <ModelView />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <ShoeManagement />
          </CustomTabPanel>
        </Container>
      </Stack>
    </Box>
  );
};

export default AdminDisplay;

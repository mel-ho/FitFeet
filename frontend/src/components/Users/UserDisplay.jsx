import React, { useState } from "react";
import { Box, Tabs, Tab, Container, Stack } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import DisplayRecommended from "./DisplayRecommended";
import DisplayFeet from "./DisplayFeet";
import DisplayOrder from "./DisplayOrder";
import DisplayProfile from "./DisplayProfile";
import UserBar from "../Login/UserBar";

const UserDisplay = () => {
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
          <h2>User Display Page</h2>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Recommended Shoes" {...a11yProps(0)} />
              <Tab label="My Orders" {...a11yProps(1)} />
              <Tab label="Feet Dimensions" {...a11yProps(2)} />
              <Tab label="User Profile" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <DisplayRecommended></DisplayRecommended>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <DisplayOrder></DisplayOrder>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <DisplayFeet></DisplayFeet>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <DisplayProfile></DisplayProfile>
          </CustomTabPanel>
        </Container>
      </Stack>
    </Box>
  );
};

export default UserDisplay;

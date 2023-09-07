import React, { useContext } from "react";
import { AppBar, Toolbar, Box, Typography, Grid } from "@mui/material";
import UserContext from "../context/user";

const UserBar = () => {
  const userCtx = useContext(UserContext);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <img src="/fitfeetlogo.png" height="50px" />
          </div>
          <div>
            {userCtx.userEmail && (
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Logged in as: {userCtx.userEmail}
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserBar;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Grid, Typography } from "@mui/material";

import UserContext from "../context/user";

const UserBar = () => {
  const userCtx = useContext(UserContext);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Link to="/">
                <img src="/fitfeetlogo.png" height="50px" alt="FitFeet Logo" />
              </Link>
            </Grid>

            <Grid item>
              {userCtx.userEmail && (
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  Logged in as: {userCtx.userEmail}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserBar;

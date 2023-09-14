import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

import UserContext from "../context/user";

const UserBar = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

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
            <Grid item display={"flex"}>
              {userCtx.userEmail && (
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 2,
                  }}
                >
                  {userCtx.userEmail}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                margin="normal"
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserBar;

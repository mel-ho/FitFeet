import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import jwtDecode from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  Button,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginBar = () => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await fetchData("/auth/login", "POST", { email, password });

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setUserId(decoded.user_id);
      userCtx.setUserEmail(decoded.email);
      userCtx.setIsActive(decoded.is_active);
      userCtx.setIsRetailer(decoded.is_retailer);
      userCtx.setRetailerId(decoded.retailer_id);
      userCtx.setIsAdmin(decoded.is_admin);

      // check if user is active
      if (decoded.is_admin) {
        navigate("/admin");
      } else if (decoded.is_retailer) {
        navigate("/retailer");
      } else if (decoded.is_active) {
        navigate("/user");
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <img src="/fitfeetlogo.png" height="50px" sx={{ mr: 2 }} />
            </Grid>
            <Grid item>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="warning"
                size="small"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                color="warning"
                size="small"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                margin="normal"
                variant="contained"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LoginBar;

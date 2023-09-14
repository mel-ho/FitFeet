import React from "react";
import { Button, Container, Stack } from "@mui/material";
import LoginBar from "./Login/LoginBar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={3}>
      <Container>
        <LoginBar />
      </Container>
      <Container>
        <h1>Fit Feet</h1>
        <Container>
          <Container>
            <h2>How it works</h2>
          </Container>
          <Container>
            <h3>Scan Your Feet</h3>
          </Container>
          <Container>
            <h3>View Recommendation</h3>
          </Container>
          <Container>
            <h3>Place Orders</h3>
          </Container>
        </Container>
        <Button variant="contained" onClick={() => navigate("/register")}>
          Find my Fit
        </Button>
      </Container>
    </Stack>
  );
};

export default LandingPage;

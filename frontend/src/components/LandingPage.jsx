import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LoginBar from "./Login/LoginBar";

const LandingPage = () => {
  return (
    <>
      <LoginBar />

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
        <Button variant="contained">Find my Fit</Button>
      </Container>
    </>
  );
};

export default LandingPage;

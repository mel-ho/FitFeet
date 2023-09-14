import React, { useState } from "react";
import { Button, Box, Container, Stack, Dialog } from "@mui/material";
import LoginBar from "./Login/LoginBar";
import Register from "./Login/Register";

const LandingPage = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ backgroundColor: "black", width: "100v" }}>
      <Stack direction="row" spacing={3}>
        <Container>
          <LoginBar />
        </Container>
        <Container
          style={{
            backgroundColor: "white",
            height: "100%",
            alignItems: "center",
          }}
        >
          <h1>Fit Feet</h1>
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
          <Button variant="contained" onClick={() => setOpen(true)}>
            Find my Fit
          </Button>
          <br />
          <br />
          <Dialog open={open} onClose={handleClose}>
            <Register />
          </Dialog>
        </Container>
        <Container
          style={{
            height: "70vh",
            position: "relative",
            margin: 0,
            padding: 0,
            alignItems: "flex-start",
          }}
        >
          <img
            src="/FootLines.jpg"
            alt="background"
            style={{
              height: "100%",
              zIndex: -1,
            }}
          />
        </Container>
      </Stack>
    </div>
  );
};

export default LandingPage;

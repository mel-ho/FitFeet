import React, { useState } from "react";
import { Button, Container, Stack, Dialog } from "@mui/material";
import LoginBar from "./Login/LoginBar";
import { useNavigate } from "react-router-dom";
import Register from "./Login/Register";

const LandingPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
        <Button variant="contained" onClick={() => setOpen(true)}>
          Find my Fit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Register />
        </Dialog>
      </Container>
    </Stack>
  );
};

export default LandingPage;

import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const handleRegister = async () => {
    try {
      const response = await fetchData(
        "/auth/register",
        "PUT",
        {
          email,
          password,
        },
        undefined
      );

      if (response.ok) {
        setSuccessMessage(response.data.msg);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error during registration");
      setSuccessMessage("");
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "2px",
      }}
    >
      <Typography variant="h6">
        <b>Give me your personal details to gain access!</b>
      </Typography>
      <br />
      <TextField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        type="password"
        placeholder="Set Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </Container>
  );
};

export default Register;

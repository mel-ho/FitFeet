import React, { useState } from "react";
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
    <div>
      <h1>Registration Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default Register;

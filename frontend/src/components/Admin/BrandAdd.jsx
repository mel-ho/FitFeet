import React, { useState, useContext } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const BrandAdd = () => {
  const userCtx = useContext(UserContext);
  const [newBrand, setNewBrand] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const handleAddBrand = async () => {
    try {
      const response = await fetchData("/shoes/brand", "PUT", {
        brand: newBrand,
      });

      if (response.ok) {
        const updatedBrandsResponse = await fetchData(
          "/shoes/brand",
          "GET",
          undefined,
          userCtx.accessToken
        );

        if (updatedBrandsResponse.ok) {
          setNewBrand(""); // Clear the input field
          setSuccessMessage("Successfully added new brand");
          setErrorMessage(""); // Clear any previous error message
        } else {
          console.error(
            "Error fetching updated brands:",
            updatedBrandsResponse.data
          );
          setErrorMessage("Error fetching updated brands");
          setSuccessMessage("");
        }
      } else {
        console.error("Error adding brand:", response.data);
        setErrorMessage("Error adding brand. Brand might already exists");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding brand:", error);
      setErrorMessage("An error occurred while adding the brand.");
      setSuccessMessage("");
    }
  };

  return (
    <Box>
      <TextField
        type="text"
        placeholder="Enter new brand"
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        value={newBrand}
        onChange={(e) => setNewBrand(e.target.value)}
      />
      <Button
        sx={{ m: 1, minWidth: 80 }}
        variant="contained"
        onClick={handleAddBrand}
      >
        Add
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}
    </Box>
  );
};

export default BrandAdd;

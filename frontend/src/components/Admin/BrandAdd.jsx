import React, { useState, useContext } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const BrandAdd = () => {
  const userCtx = useContext(UserContext);
  const [newBrand, setNewBrand] = useState("");
  const fetchData = useFetch();

  const handleAddBrand = async () => {
    try {
      const response = await fetchData("/shoes/brand", "PUT", {
        brandname: newBrand,
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
        } else {
          console.error(
            "Error fetching updated brands:",
            updatedBrandsResponse.data
          );
        }
      } else {
        console.error("Error adding brand:", response.data);
      }
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h5">Brand Management</Typography>

        <TextField
          type="text"
          placeholder="Enter brand"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddBrand}>
          Add
        </Button>
      </Paper>
    </Box>
  );
};

export default BrandAdd;

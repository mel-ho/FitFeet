import React, { useState, useContext } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const SizeAdd = () => {
  const userCtx = useContext(UserContext);
  const [newSize, setNewSize] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const fetchData = useFetch();

  const handleAddSize = async () => {
    try {
      const sizeValue = parseInt(newSize);

      if (!isNaN(sizeValue)) {
        const response = await fetchData("/shoes/sizes", "PUT", {
          size_us: sizeValue,
        });

        if (response.ok) {
          const updatedSizesResponse = await fetchData(
            "/shoes/sizes",
            "GET",
            undefined,
            userCtx.accessToken
          );

          if (updatedSizesResponse.ok) {
            setNewSize("");
            setErrorMessage("");
          } else {
            console.error(
              "Error fetching updated sizes:",
              updatedSizesResponse.data
            );
          }
        } else {
          const errorData = response.data;
          setErrorMessage(
            errorData.error || "An error occurred while adding the size."
          );
        }
      } else {
        const errorMessage =
          "Invalid size input. Please enter a valid integer.";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error adding size:", error);
      setErrorMessage("An error occurred while adding the size.");
    }
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h5">Size Management</Typography>

        <TextField
          type="text"
          placeholder="Enter size"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddSize}>
          Add
        </Button>

        {errorMessage && ( // Render error message if errorMessage is not empty
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SizeAdd;

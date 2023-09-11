import React, { useState, useContext } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelAdd = () => {
  const userCtx = useContext(UserContext);
  const [newModel, setNewModel] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const fetchData = useFetch();

  const handleAddModel = async () => {
    try {
      const response = await fetchData("/shoes/model", "PUT", {
        model: newModel,
      });

      if (response.ok) {
        const updatedModelsResponse = await fetchData(
          "/shoes/model",
          "GET",
          undefined,
          userCtx.accessToken
        );

        if (updatedModelsResponse.ok) {
          setNewModel(""); // Clear the input field
          setErrorMessage(""); // Clear any previous error message
        } else {
          console.error(
            "Error fetching updated models:",
            updatedModelsResponse.data
          );
          setErrorMessage("Error fetching updated models");
        }
      } else {
        console.error("Error adding model:", response.data);
        setErrorMessage("Error adding model. Model might already exists");
      }
    } catch (error) {
      console.error("Error adding model:", error);
      setErrorMessage("An error occurred while adding the model.");
    }
  };

  return (
    <Box>
      <Paper>
        <TextField
          type="text"
          placeholder="Enter model"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          value={newModel}
          onChange={(e) => setNewModel(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddModel}>
          Add
        </Button>

        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ModelAdd;

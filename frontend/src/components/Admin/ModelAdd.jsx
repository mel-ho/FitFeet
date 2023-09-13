import React, { useState, useContext } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelAdd = () => {
  const userCtx = useContext(UserContext);
  const [newModel, setNewModel] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
          setSuccessMessage("Successfully added new model!");
          setErrorMessage("");
        } else {
          console.error(
            "Error fetching updated models:",
            updatedModelsResponse.data
          );
          setErrorMessage("Error fetching updated models");
          setSuccessMessage("");
        }
      } else {
        console.error("Error adding model:", response.data);
        setErrorMessage("Error adding model. Model might already exists");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding model:", error);
      setErrorMessage("An error occurred while adding the model.");
      setSuccessMessage("");
    }
  };

  return (
    <Box>
      <TextField
        type="text"
        placeholder="Enter model"
        sx={{ m: 1, minWidth: 120 }}
        size="small"
        value={newModel}
        onChange={(e) => setNewModel(e.target.value)}
      />
      <TextField
        placeholder="Enter image link"
        type="url"
        sx={{ m: 1, minWidth: 180 }}
        multiline
        value={imgLink}
        onChange={(e) => setImgLink(e.target.value)}
      />
      <Button
        sx={{ m: 1, minWidth: 80 }}
        variant="contained"
        onClick={handleAddModel}
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

export default ModelAdd;

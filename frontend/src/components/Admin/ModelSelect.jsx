import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelSelect = ({ onModelChange }) => {
  const userCtx = useContext(UserContext);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const fetchData = useFetch();

  const getModels = async () => {
    const res = await fetchData(
      "/shoes/model",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setModels(res.data);
    } else {
      console.error("Error fetching models:", res.data);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleLocalModelChange = (event) => {
    setSelectedModel(event.target.value);
    onModelChange(event);
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h6">Select Models</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="model-select-label">Select Model</InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={selectedModel}
            onChange={handleLocalModelChange}
          >
            {models.map((model) => (
              <MenuItem key={model.model} value={model.model}>
                {model.model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default ModelSelect;

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

const ModelSelect = () => {
  const userCtx = useContext(UserContext);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const fetchData = useFetch();

  const getBrands = async () => {
    const res = await fetchData(
      "/shoes/brand",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setBrands(res.data);
    } else {
      console.error("Error fetching brands:", res.data);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const getModelsByBrand = async (selectedBrandId) => {
    try {
      const res = await fetchData(
        `/shoes/model/${selectedBrandId}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setModels(res.data); // Update the models state
      } else {
        console.error("Error getting models:", res.data);
      }
    } catch (error) {
      console.error("Error getting models:", error);
    }
  };

  useEffect(() => {
    getModelsByBrand(selectedBrandId);
  }, [selectedBrandId]);

  const handleBrandChange = (event) => {
    const selectedBrandId = event.target.value;
    setSelectedBrandId(selectedBrandId);
    getModelsByBrand(selectedBrandId);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h6">View Models</Typography>
        {/* Brand selection */}
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="brand-select-label">Select Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            id="brand-select"
            value={selectedBrandId}
            onChange={handleBrandChange}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.brand_id} value={brand.brand_id}>
                {brand.brandname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="model-select-label">Select Model</InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={selectedModel}
            onChange={handleModelChange}
          >
            {models.map((model) => (
              <MenuItem key={model.model_id} value={model.model}>
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

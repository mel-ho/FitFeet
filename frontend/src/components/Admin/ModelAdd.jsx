import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelAdd = () => {
  const userCtx = useContext(UserContext);
  const [brands, setBrands] = useState([]);
  const [newModel, setNewModel] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
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

  const handleAddModel = async () => {
    try {
      console.log("Selected Brand Id:", selectedBrandId);
      console.log("New Model:", newModel);

      const response = await fetchData("/shoes/model", "PUT", {
        brand_id: selectedBrandId,
        model: newModel,
      });

      if (response.ok) {
        // Handle success if needed
        setNewModel(""); // Clear the input field
      } else {
        console.error("Error adding model:", response.data);
      }
    } catch (error) {
      console.error("Error adding model:", error);
    }
  };

  const handleBrandChange = (event) => {
    const selectedBrandId = event.target.value;
    setSelectedBrandId(selectedBrandId);
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h5">Model Management</Typography>

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

        {/* Model input */}
        <TextField
          type="text"
          placeholder="Enter model"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          value={newModel}
          onChange={(e) => setNewModel(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddModel}>
          Add Model
        </Button>
      </Paper>
    </Box>
  );
};

export default ModelAdd;

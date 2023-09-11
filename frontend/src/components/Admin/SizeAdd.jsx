import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const SizeAdd = () => {
  const userCtx = useContext(UserContext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newSize, setNewSize] = useState("");
  const [sizeCountries, setSizeCountries] = useState([]);
  const [sizesData, setSizesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchData = useFetch();

  const fetchCountries = async () => {
    try {
      const response = await fetchData(
        "/shoes/sizecountry",
        "GET",
        undefined,
        userCtx
      );
      if (response.ok) {
        setSizeCountries(response.data);
      } else {
        console.error("Error fetching countries:", response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const getSizes = async () => {
    const res = await fetchData(
      "/shoes/sizes",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      const sizesData = res.data;
      setSizesData(sizesData);

      // Extract and populate size countries
      const countries = [
        ...new Set(sizesData.map((size) => size.size_country)),
      ];
      setSizeCountries(countries);
    } else {
      console.error("Error fetching sizes:", res.data);
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  const handleAddSize = async () => {
    try {
      const sizeValue = parseInt(newSize);

      if (!isNaN(sizeValue)) {
        const response = await fetchData("/shoes/sizes", "PUT", {
          size_country: selectedCountry,
          size_number: sizeValue,
        });

        if (response.ok) {
          const updatedSizesResponse = await fetchData(
            `/shoes/sizes/${selectedCountry}`,
            "GET",
            undefined,
            userCtx.accessToken
          );

          if (updatedSizesResponse.ok) {
            setNewSize("");
            setErrorMessage("");
            // Update the sizes state with the updated sizes for the selected country
            setSizesData(updatedSizesResponse.data);
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

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h6">Add Sizes</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-country-select-label">
            Select Size Country
          </InputLabel>
          <Select
            labelId="size-country-select-label"
            id="size-country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <MenuItem value="">
              <em>Select Country</em>
            </MenuItem>
            {sizeCountries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SizeAdd;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const SizeSelect = () => {
  const userCtx = useContext(UserContext);
  const [sizeCountries, setSizeCountries] = useState([]);
  const [selectedSizeCountry, setSelectedSizeCountry] = useState("");
  const [sizeNumbers, setSizeNumbers] = useState([]);
  const [selectedSizeNumber, setSelectedSizeNumber] = useState("");
  const fetchData = useFetch();

  const getSizes = async () => {
    try {
      const res = await fetchData(
        "/shoes/sizes", // Assuming this endpoint fetches sizes with additional data
        "GET",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        const sizesData = res.data;

        // Extract and populate size countries
        const countries = [
          ...new Set(sizesData.map((size) => size.size_country)),
        ];
        setSizeCountries(countries);
      } else {
        console.error("Error fetching sizes:", res.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  const handleSizeCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setSelectedSizeCountry(selectedCountry);

    try {
      const response = await fetchData(
        `/shoes/sizes/${selectedCountry}`,
        "GET",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        const sizeNumbers = response.data;
        setSizeNumbers(sizeNumbers);
      } else {
        console.error("Error fetching sizes:", response.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }

    setSelectedSizeNumber(""); // Clear the selected size number
  };

  const handleSizeNumberChange = (event) => {
    setSelectedSizeNumber(event.target.value);
  };

  if (sizeCountries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Paper>
        <Typography variant="h6">Select Sizes</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-country-select-label">
            Select Size Country
          </InputLabel>
          <Select
            labelId="size-country-select-label"
            id="size-country-select"
            value={selectedSizeCountry}
            onChange={handleSizeCountryChange}
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

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-number-select-label">
            Select Size Number
          </InputLabel>
          <Select
            labelId="size-number-select-label"
            id="size-number-select"
            value={selectedSizeNumber}
            onChange={handleSizeNumberChange}
          >
            <MenuItem value="">
              <em>Select Size</em>
            </MenuItem>
            {sizeNumbers.map((number) => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default SizeSelect;

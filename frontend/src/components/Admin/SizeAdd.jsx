import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const fetchData = useFetch();

  const fetchCountries = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetchData(
        "/shoes/sizecountry",
        "GET",
        undefined,
        userCtx
      );
      if (response.ok) {
        setSizeCountries(response.data);
        setIsLoading(false); // Set loading state to false
      } else {
        console.error("Error fetching countries:", response.data);
        setIsLoading(false); // Set loading state to false
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setIsLoading(false); // Set loading state to false
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
            setSuccessMessage("Successfully added new size!");
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
          setSuccessMessage("");
        }
      } else {
        const errorMessage =
          "Invalid size input. Please enter a valid integer.";
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding size:", error);
      setErrorMessage("An error occurred while adding the size.");
      setSuccessMessage("");
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <InputLabel id="size-country-select-label">Select Country</InputLabel>
        <Select
          labelId="size-country-select-label"
          id="size-country-select"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <MenuItem value="">Select Country</MenuItem>
          {!isLoading ? (
            sizeCountries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Loading...
            </MenuItem>
          )}
        </Select>

        <TextField
          type="number"
          placeholder="Enter size"
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
        />

        <Button variant="contained" onClick={handleAddSize}>
          Add Size
        </Button>
      </FormControl>
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

export default SizeAdd;

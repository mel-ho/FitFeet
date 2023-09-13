import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const BrandSelect = ({ value = "", onBrandChange }) => {
  const userCtx = useContext(UserContext);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
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

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    onBrandChange(event);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
        <InputLabel id="brand-select-label">Select Brand</InputLabel>
        <Select
          labelId="brand-select-label"
          id="brand-select"
          value={value}
          onChange={onBrandChange}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.brand} value={brand.brand}>
              {brand.brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BrandSelect;

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
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const fetchData = useFetch();

  const getSizes = async () => {
    const res = await fetchData(
      "/shoes/sizes",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setSizes(res.data);
    } else {
      console.error("Error fetching sizes:", res.data);
    }
  };
  useEffect(() => {
    getSizes();
  }, []);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <Box>
      <Paper>
        <Typography variant="h6">View Sizes</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="size-select-label">Select Size</InputLabel>
          <Select
            labelId="size-select-label"
            id="size-select"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            {sizes.map((size) => (
              <MenuItem key={size.size_id} value={size.size_us}>
                {size.size_us}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default SizeSelect;

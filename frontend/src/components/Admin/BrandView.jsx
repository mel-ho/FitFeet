import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Typography, TableCell } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const BrandView = () => {
  const userCtx = useContext(UserContext);
  const [brands, setBrands] = useState([]);
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

  return (
    <Box>
      <Paper>
        <Typography variant="h6">View Brands</Typography>
        {brands.map((brand) => (
          <TableCell key={brand.brand} value={brand.brand}>
            {brand.brand}
          </TableCell>
        ))}
      </Paper>
    </Box>
  );
};

export default BrandView;

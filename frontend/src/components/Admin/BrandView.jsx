import React, { useState, useEffect, useContext } from "react";
import { Box, Table, TableCell, TableRow, TableBody } from "@mui/material";
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
      <Table>
        <TableBody>
          {brands.map((brand) => (
            <TableRow>
              <TableCell key={brand.brand} value={brand.brand}>
                {brand.brand}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BrandView;

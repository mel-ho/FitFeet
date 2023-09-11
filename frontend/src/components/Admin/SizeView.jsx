import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const SizeSelect = () => {
  const userCtx = useContext(UserContext);
  const [sizesData, setSizesData] = useState([]);
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
        setSizesData(sizesData);
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

  return (
    <Box>
      <Paper>
        <Typography variant="h6">View Sizes</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Size Country</TableCell>
                <TableCell>Size Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizesData.map((size, index) => (
                <TableRow key={index}>
                  <TableCell>{size.size_country}</TableCell>
                  <TableCell>{size.size_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SizeSelect;

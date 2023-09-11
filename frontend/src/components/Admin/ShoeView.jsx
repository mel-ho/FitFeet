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
  TextField,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ShoeView = () => {
  const userCtx = useContext(UserContext);
  const [shoesData, setShoesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchData = useFetch();

  const getShoes = async () => {
    try {
      const res = await fetchData(
        "/shoes/shoes",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setShoesData(res.data);
      } else {
        console.error("Error fetching shoes:", res.data);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredShoesData = shoesData.filter((shoe) => {
    return (
      shoe.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.size_country.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.size_number.toString().includes(searchText)
    );
  });

  useEffect(() => {
    getShoes();
  }, []);

  return (
    <Box>
      <Paper>
        <Typography variant="h6">View Shoes</Typography>
        <TextField
          label="Search by Brand, Model, or Size"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredShoesData.map((shoe, index) => (
                <TableRow key={index}>
                  <TableCell>{shoe.brand}</TableCell>
                  <TableCell>{shoe.model}</TableCell>
                  <TableCell>{shoe.size_country}</TableCell>
                  <TableCell>{shoe.size_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ShoeView;

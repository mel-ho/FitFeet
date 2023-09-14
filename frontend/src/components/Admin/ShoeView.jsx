import React, { useContext, useEffect, useState } from "react";
import {
  Box,
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
      <br />
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
              <TableCell>
                <b>Brand</b>
              </TableCell>
              <TableCell>
                <b>Model</b>
              </TableCell>
              <TableCell>
                <b>Country</b>
              </TableCell>
              <TableCell>
                <b>Size</b>
              </TableCell>
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
    </Box>
  );
};

export default ShoeView;

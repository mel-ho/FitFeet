import React, { useEffect, useState, useContext } from "react";
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
import dayjs from "dayjs";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ProductView = () => {
  const userCtx = useContext(UserContext);
  const [productData, setProductData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchData = useFetch();

  const getProducts = async () => {
    try {
      const retailer_id = userCtx.retailerId; // Retrieve retailer ID from context
      const res = await fetchData(
        `/retail/products/${retailer_id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setProductData(res.data);
      } else {
        console.error("Error fetching products:", res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const filteredProductData = productData.filter((product) => {
    return (
      product.product_id.toString().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      product.model.toLowerCase().includes(searchText.toLowerCase()) ||
      product.size_country.toLowerCase().includes(searchText.toLowerCase()) ||
      product.size_number.toString().includes(searchText)
    );
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <br />
      <TextField
        label="Search by Product ID, Brand, Model, or Size"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Date Purchased</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProductData.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.product_id}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.size_country}</TableCell>
                <TableCell>{product.size_number}</TableCell>
                <TableCell>{formatDate(product.date_purchased)}</TableCell>
                <TableCell>{product.product_quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductView;

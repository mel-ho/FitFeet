import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BrandSelect from "../Admin/BrandSelect";
import ModelSelect from "../Admin/ModelSelect";
import SizeSelect from "../Admin/SizeSelect";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import BrandAdd from "../Admin/BrandAdd";
import ModelAdd from "../Admin/ModelAdd";
import SizeAdd from "../Admin/SizeAdd";

const ProductAdd = () => {
  const userCtx = useContext(UserContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sizeCountry, setSizeCountry] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [datePurchased, setDatePurchased] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const handleAddProduct = async () => {
    try {
      const retailerId = userCtx?.retailerId || null; // Make sure to add retailerId to your UserContext
      const response = await fetchData("/retail/products", "PUT", {
        retailer_id: retailerId,
        brand,
        model,
        size_country: sizeCountry,
        size_number: sizeNumber,
        date_purchased: datePurchased,
        quantity,
      });

      if (response.ok) {
        // Reset fields
        setBrand("");
        setModel("");
        setSizeCountry("");
        setSizeNumber("");
        setQuantity(1);
        setDatePurchased(new Date().toISOString().substring(0, 10));
        setSuccessMessage("Successfully added new product!");
        setErrorMessage("");
      } else {
        console.error("Error adding product:", response.data);
        setErrorMessage(response.data);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage(error.toString());
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <Grid
        container
        spacing={2}
        alignItems="top"
        style={{ textAlign: "left" }}
      >
        <Grid item xs={4}>
          <Typography>Choose an existing brand:</Typography>
        </Grid>
        <Grid item xs={8}>
          <BrandSelect
            value={brand}
            onBrandChange={(e) => setBrand(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          Can't find your brand?
          <br />
          Add a new one
        </Grid>
        <Grid item xs={8}>
          <BrandAdd></BrandAdd>
        </Grid>
        <Grid item xs={4}>
          <Typography>Choose an existing model:</Typography>
        </Grid>
        <Grid item xs={8}>
          <ModelSelect
            value={model}
            onModelChange={(e) => setModel(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Can't find a model?
            <br />
            Add a new one
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <ModelAdd></ModelAdd>
        </Grid>
        <Grid item xs={4}>
          <Typography>Choose an existing size:</Typography>
        </Grid>
        <Grid item xs={8}>
          <SizeSelect
            size_country={sizeCountry}
            size_number={sizeNumber}
            onSizeChange={(size_country, size_number) => {
              setSizeCountry(size_country);
              if (size_number) {
                setSizeNumber(size_number);
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>
            Can't find your Size?
            <br />
            Enter a new size:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <SizeAdd></SizeAdd>
        </Grid>
        <Grid item xs={4}>
          <Typography>Quantity</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Quantity"
            placeholder="Enter qty"
            type="number"
            sx={{ m: 1, minWidth: 180 }}
            size="small"
            InputProps={{ inputProps: { min: 1 } }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>Date Purchased</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Date Purchased"
            type="date"
            sx={{ m: 1, minWidth: 180 }}
            size="small"
            InputLabelProps={{ shrink: true }}
            value={datePurchased}
            onChange={(e) => setDatePurchased(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ m: 1, minWidth: 180 }}
            variant="contained"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Grid>
        <Grid>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          {successMessage && (
            <Typography color="primary">{successMessage}</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductAdd;

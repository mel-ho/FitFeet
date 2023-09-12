import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BrandSelect from "../Admin/BrandSelect";
import ModelSelect from "../Admin/ModelSelect";
import SizeSelect from "../Admin/SizeSelect";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

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
    <Box>
      <Container>
        <br />
        <BrandSelect
          value={brand}
          onBrandChange={(e) => setBrand(e.target.value)}
        />
        <ModelSelect
          value={model}
          onModelChange={(e) => setModel(e.target.value)}
        />
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
        <TextField
          label="Date Purchased"
          type="date"
          sx={{ m: 1, minWidth: 180 }}
          size="small"
          InputLabelProps={{ shrink: true }}
          value={datePurchased}
          onChange={(e) => setDatePurchased(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}
      </Container>
    </Box>
  );
};

export default ProductAdd;

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
  Rating,
  TextField,
  Typography,
} from "@mui/material";

const UserShoeAdd = () => {
  const userCtx = useContext(UserContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sizeCountry, setSizeCountry] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [dateWorn, setDateWorn] = useState("");
  const [dateDisposed, setDateDisposed] = useState("");
  const [starRating, setStarRating] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const handleAddUserShoe = async () => {
    try {
      const userId = userCtx?.userId || null; // Use null if user is not logged in
      const response = await fetchData(
        "/shoes/usershoes",
        "PUT",
        {
          brand: brand,
          model: model,
          size_country: sizeCountry,
          size_number: sizeNumber,
          date_purchased: datePurchased,
          date_worn: dateWorn,
          date_disposed: dateDisposed,
          star_rating: starRating,
          user_id: userId,
        },
        userCtx.accessToken
      );

      if (response.ok) {
        // Reset to initial state after a successful add
        setBrand("");
        setModel("");
        setSizeCountry("");
        setSizeNumber("");
        setDatePurchased("");
        setDateWorn("");
        setDateDisposed("");
        setStarRating(3);
        setSuccessMessage("Successfully added new pair of user shoes!");
        setErrorMessage("");
      } else {
        console.error("Error adding user shoe:", response.data);
        setErrorMessage(response.data);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding user shoe:", error);
      setErrorMessage(error.toString());
      setSuccessMessage("");
    }
  };

  const handleDateChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <Box>
      <Container>
        <Typography variant="h4">Add Your Shoe</Typography>
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
          label="Date Purchased"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleDateChange(setDatePurchased)}
        />
        <TextField
          label="Date Worn"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleDateChange(setDateWorn)}
        />
        <TextField
          label="Date Disposed"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleDateChange(setDateDisposed)}
        />
        <Rating
          value={starRating}
          onChange={(event, newValue) => setStarRating(newValue)}
        />
        <Button variant="contained" onClick={handleAddUserShoe}>
          Add User Shoe
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}
      </Container>
    </Box>
  );
};

export default UserShoeAdd;

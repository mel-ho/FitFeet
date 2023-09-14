import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BrandSelect from "./BrandSelect";
import ModelSelect from "./ModelSelect";
import SizeSelect from "./SizeSelect";
import { Box, Button, Container, Typography } from "@mui/material";

const ShoeAdd = () => {
  const userCtx = useContext(UserContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sizeCountry, setSizeCountry] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const handleAddShoe = async () => {
    try {
      const response = await fetchData("/shoes/shoes", "PUT", {
        brand: brand,
        model: model,
        size_country: sizeCountry,
        size_number: sizeNumber,
      });
      console.log({ brand, model, sizeCountry, sizeNumber });

      if (response.ok) {
        const updatedShoeResponse = await fetchData(
          "/shoes/shoes",
          "GET",
          undefined,
          userCtx.accessToken
        );

        if (updatedShoeResponse.ok) {
          setBrand("");
          setModel("");
          setSizeNumber("");
          setSizeCountry("");
          setSuccessMessage("Successfully added new shoes!");
          setErrorMessage("");
        } else {
          console.error(
            "Error fetching updated shoe:",
            updatedShoeResponse.data
          );
          setErrorMessage(response.data);
          setSuccessMessage("");
        }
      } else {
        console.error("Error adding shoe:", response.data);
        setErrorMessage(response.data);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding shoe:", error);
      setErrorMessage(error.toString());
      setSuccessMessage("");
    }
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setModel(selectedModel);
  };

  const handleSizeChange = (sizeCountry, sizeNumber) => {
    setSizeCountry(sizeCountry);
    setSizeNumber(sizeNumber);
  };

  return (
    <Box>
      <Container>
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
        <Button variant="contained" onClick={handleAddShoe}>
          Add Shoe
        </Button>
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}
      </Container>
    </Box>
  );
};

export default ShoeAdd;

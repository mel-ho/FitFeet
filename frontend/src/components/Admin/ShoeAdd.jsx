import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BrandSelect from "./BrandSelect";
import ModelSelect from "./ModelSelect";
import SizeSelect from "./SizeSelect";
import { Box, Button, Container, Paper } from "@mui/material";

const ShoeAdd = () => {
  const userCtx = useContext(UserContext);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [sizeCountry, setSizeCountry] = useState("");
  const [sizeNumber, setSizeNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Add error message state
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
          setErrorMessage("");
        } else {
          console.error(
            "Error fetching updated shoe:",
            updatedShoeResponse.data
          );
          setErrorMessage("Error fetching updated shoes");
        }
      } else {
        console.error("Error adding shoe:", response.data);
        setErrorMessage("Error adding shoe. Shoe might already exists");
      }
    } catch (error) {
      console.error("Error adding shoe:", error);
      setErrorMessage("An error occurred while adding the shoe.");
    }
  };

  const handleBrandChange = (event) => {
    console.log("1Event in AddShoe: ", event.target.value);
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
  };

  const handleModelChange = (event) => {
    console.log("2Event in AddShoe: ", event.target.value);
    const selectedModel = event.target.value;
    setModel(selectedModel);
  };

  const handleSizeChange = (sizeCountry, sizeNumber) => {
    console.log("3", sizeCountry);
    console.log("4", sizeNumber);
    setSizeCountry(sizeCountry);
    setSizeNumber(sizeNumber);
  };

  return (
    <Box>
      <Paper>
        <Container>
          <BrandSelect onBrandChange={handleBrandChange}></BrandSelect>
          <ModelSelect onModelChange={handleModelChange}></ModelSelect>
          <SizeSelect onSizeChange={handleSizeChange}></SizeSelect>
          <Button variant="contained" onClick={handleAddShoe}>
            Add Shoe
          </Button>
        </Container>
      </Paper>
    </Box>
  );
};

export default ShoeAdd;

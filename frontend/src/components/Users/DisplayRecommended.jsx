import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import DisplayOrder from "./DisplayOrder";

const DisplayRecommended = () => {
  const userCtx = useContext(UserContext);
  const [recommendedShoes, setRecommendedShoes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fetchData = useFetch();

  const getRecommendedShoes = async () => {
    try {
      const user_id = userCtx.userId;
      const res = await fetchData(
        `/recommender/${user_id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setRecommendedShoes(res.data);
      } else {
        console.error("Error fetching recommended shoes:", res.data);
      }
    } catch (error) {
      console.error("Error fetching recommended shoes:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRecommendedShoes = recommendedShoes.filter((shoe) => {
    return (
      shoe.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.size_number.toString().includes(searchText)
    );
  });

  useEffect(() => {
    getRecommendedShoes();
  }, []);

  const handleOrder = async (shoe) => {
    try {
      const retailerId = shoe.retailer_id;
      const userId = userCtx.userId;
      const productId = shoe.product_id;

      const product = {
        retailer_id: retailerId,
        user_id: userId,
        product_id: productId,
        quantity: 1,
      };

      const res = await fetchData(
        "/retail/orders",
        "PUT",
        product,
        userCtx.accessToken
      );
      if (res.ok) {
        setSuccessMessage(
          `Successfully ordered: ${shoe.brand} ${shoe.model} ${shoe.size_country} ${shoe.size_number}`
        );
        setErrorMessage("");
        getRecommendedShoes();
      } else {
        setErrorMessage(response.data);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(response.data);
      setSuccessMessage("");
    }
  };

  return (
    <Box>
      <br />
      <TextField
        label="Search by Brand, Model, or Size"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
      />
      <br />
      <Box display="flex" flexWrap="wrap" p={1} m={1}>
        {filteredRecommendedShoes.map((shoe, index) => (
          <Card sx={{ maxWidth: 345, m: 1 }} key={index}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={shoe.img_link}
                alt={`${shoe.brand} ${shoe.model}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {shoe.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {shoe.brand} <br />
                  Size: {shoe.size_country} {shoe.size_number} <br />
                  {shoe.name ? (
                    <>
                      Retailer: {shoe.name} <br />
                      Quantity: {shoe.quantity ?? 0}
                    </>
                  ) : (
                    <Typography color="error">No Retailers Found</Typography>
                  )}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {shoe.name && shoe.quantity ? (
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleOrder(shoe)}
                >
                  Order
                </Button>
              ) : (
                shoe.name && <Typography color="error">Sold Out</Typography>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {successMessage && <Typography>{successMessage}</Typography>}
      </Box>
    </Box>
  );
};

export default DisplayRecommended;

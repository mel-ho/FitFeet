import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const DisplayOrder = () => {
  const userCtx = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchData = useFetch();

  const getOrders = async () => {
    try {
      const user_id = userCtx.userId;
      const res = await fetchData(
        `/retail/orders/u/${user_id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setOrders(res.data);
      } else {
        console.log("Error fetching orders: " + res.data);
      }
    } catch (error) {
      console.log("Error fetching orders: " + res.data);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" p={1} m={1}>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <Card sx={{ maxWidth: 345, m: 1 }} key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={order.img_link}
                  alt={`${order.brand} ${order.model}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {order.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Brand: {order.brand} <br />
                    Retailer: {order.retailer_name} <br />
                    Order Date:{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                    <br />
                    Status: {order.order_status}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="h6">No existing orders</Typography>
        )}
      </Box>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </Box>
  );
};

export default DisplayOrder;

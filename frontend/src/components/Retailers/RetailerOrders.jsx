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
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const RetailerOrders = () => {
  const userCtx = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  const fetchData = useFetch();

  const getOrders = async () => {
    try {
      const retailer_id = userCtx.retailerId;
      const res = await fetchData(
        `/retail/orders/r/${retailer_id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setOrders(res.data);
      } else {
        console.error("Error fetching orders:", res.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getOrderStatus = async () => {
    try {
      const res = await fetchData(
        `/retail/orderstatus/`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setOrderStatus(res.data.map((item) => item.order_status));
      } else {
        console.error("Error fetching orderstatus");
      }
    } catch (error) {
      console.error("Error fetching orderstatus");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetchData(
        `/retail/orderstatus/${orderId}`,
        "PATCH",
        { order_status: newStatus },
        userCtx.accessToken
      );
      if (res.ok) {
        getOrders();
      } else {
        console.error("Error updating order status:", res.data);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // New state variables for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (searchTerm === "" ||
        order.order_id.toString().includes(searchTerm) ||
        order.user_id.toString().includes(searchTerm) ||
        order.product_id.toString().includes(searchTerm)) &&
      (selectedStatus === "" ||
        order.order_status.toLowerCase() === selectedStatus.toLowerCase())
    );
  });

  useEffect(() => {
    getOrders();
    getOrderStatus();
  }, []);

  return (
    <Box>
      <br />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Search by Customer ID or Product ID"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Typography> Filter by status:</Typography>
        <Select
          size="small"
          value={selectedStatus}
          onChange={handleStatusChange}
          displayEmpty
          sx={{ width: 120 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {orderStatus.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <br></br>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Shoe</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>
                  <b>Customer ID:</b>
                  <br />
                  {order.user_id}
                  <br />
                  <b>Shipping Address:</b>
                  <br />
                  {order.shipping_address}
                </TableCell>
                <TableCell>
                  <b>Product ID:</b>
                  <br />
                  {order.product_id}
                  <br />
                  {order.brand}
                  <br />
                  {order.model}
                  <br />
                  {`${order.size_country} ${order.size_number}`}
                </TableCell>
                <TableCell>{order.order_quantity}</TableCell>
                <TableCell>
                  {dayjs(order.order_date).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {orderStatus.length > 0 ? (
                    <Select
                      size="small"
                      value={order.order_status.toLowerCase()} // Assuming the fetched orderStatus values are lower-cased
                      onChange={(e) =>
                        updateOrderStatus(order.order_id, e.target.value)
                      }
                    >
                      {orderStatus.map((status, index) => (
                        <MenuItem key={index} value={status.toLowerCase()}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <span>Loading...</span> // or some other placeholder
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RetailerOrders;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs"; // Install this package for date manipulation
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import UserShoeAdd from "./UserShoeAdd"; // Adjust the path as needed

const DisplayShoes = () => {
  const userCtx = useContext(UserContext);
  const [shoesData, setShoesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetchData = useFetch();

  const getShoes = async () => {
    try {
      const user_id = userCtx.userId; // Retrieve user ID from context
      const res = await fetchData(
        `/shoes/usershoes/${user_id}`,
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

  const calculateDuration = (dateWorn, dateDisposed) => {
    const start = dayjs(dateWorn);
    const end = dateDisposed ? dayjs(dateDisposed) : dayjs();
    return end.diff(start, "day"); // Calculates the duration in days
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD"); // Formats the date
  };

  const filteredShoesData = shoesData.filter((shoe) => {
    return (
      shoe.brand.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.model.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.size_country.toLowerCase().includes(searchText.toLowerCase()) ||
      shoe.size_number.toString().includes(searchText)
    );
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getShoes();
  }, []);

  return (
    <Box>
      <Button onClick={handleOpen}>Add Shoe</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UserShoeAdd />
        </Box>
      </Modal>

      <Typography variant="h6">View Shoes</Typography>
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
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Start Use Date</TableCell>
              <TableCell>Used Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredShoesData.map((shoe, index) => (
              <TableRow key={index}>
                <TableCell>{shoe.brand}</TableCell>
                <TableCell>{shoe.model}</TableCell>
                <TableCell>{shoe.size_country}</TableCell>
                <TableCell>{shoe.size_number}</TableCell>
                <TableCell>{formatDate(shoe.date_worn)}</TableCell>
                <TableCell>
                  {calculateDuration(shoe.date_worn, shoe.date_disposed)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default DisplayShoes;

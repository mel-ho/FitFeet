import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const RetailerProfile = () => {
  const [value, setValue] = useState(0);
  const [retailerInfo, setRetailerInfo] = useState({});
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  console.log(userCtx);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getRetailerDetails = async () => {
    try {
      const retailer_id = userCtx.retailerId;
      const res = await fetchData(
        `/retail/retailers/${retailer_id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );

      if (res.ok) {
        console.log("Received retailer data: ", res.data);
        setRetailerInfo(res.data);
      } else {
        console.error("Error fetching retailer details:", res.data);
      }
    } catch (error) {
      console.error("Error fetching retailer details:", error);
    }
  };

  const updateRetailerDetails = async () => {
    const retailer_id = userCtx.retailerId;
    const updatedInfo = { ...retailerInfo };
    const res = await fetchData(
      `/retail/retailers/${retailer_id}`,
      "PATCH",
      updatedInfo,
      userCtx.accessToken
    );

    if (res.ok) {
      setRetailerInfo(updatedInfo);
      alert("Retailer details updated successfully");
    } else {
      alert("Failed to update retailer details");
    }
  };

  useEffect(() => {
    getRetailerDetails();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Retailer ID</TableCell>
              <TableCell>
                <TextField
                  aria-label="Retailer ID"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={retailerInfo.retailer_id}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>
                <TextField
                  aria-label="Email"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={retailerInfo.email}
                  onChange={(e) =>
                    setRetailerInfo({ ...retailerInfo, email: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>
                <TextField
                  aria-label="Name"
                  type="text"
                  value={retailerInfo.name}
                  onChange={(e) =>
                    setRetailerInfo({ ...retailerInfo, name: e.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contact Number</TableCell>
              <TableCell>
                <TextField
                  aria-label="Contact Number"
                  type="text"
                  value={retailerInfo.contact_detail}
                  onChange={(e) =>
                    setRetailerInfo({
                      ...retailerInfo,
                      contact_detail: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contact Address</TableCell>
              <TableCell>
                <TextField
                  aria-label="Contact Address"
                  multiline
                  maxRows={3}
                  value={retailerInfo.contact_address}
                  onChange={(e) =>
                    setRetailerInfo({
                      ...retailerInfo,
                      contact_address: e.target.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateRetailerDetails}
                >
                  Update Details
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RetailerProfile;

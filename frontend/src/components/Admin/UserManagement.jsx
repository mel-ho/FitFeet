import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Checkbox,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";

const UserManagement = () => {
  const userCtx = useContext(UserContext);
  const [userData, setUserData] = useState([]); // for updating user data
  const [searchText, setSearchText] = useState(""); // for updating search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = useFetch(); // Initialize the useFetch hook

  const getUsers = async () => {
    const res = await fetchData(
      "/users/users",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setUserData(res.data);
    } else {
      console.error("Error fetching user data: ", res.data);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the starting and ending indexes based on the current page and rowsPerPage
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Filter the userData based on the searchText and sort by email
  const filteredUserData = userData
    .filter(
      (user) =>
        user.user_id.toString().includes(searchText) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => a.email.localeCompare(b.email));

  // Slice the filtered user data based on the current pagination settings
  const paginatedUserData = filteredUserData.slice(startIndex, endIndex);

  // PATCH to update user attributes
  const handleAttributeChange = async (user, attributeName) => {
    const updatedValue = !user[attributeName]; // Toggle the attribute value

    const dataToUpdateForUser = {
      email: user.email,
      is_retailer:
        attributeName === "is_retailer" ? updatedValue : user.is_retailer,
      is_admin: attributeName === "is_admin" ? updatedValue : user.is_admin,
      is_active: attributeName === "is_active" ? updatedValue : user.is_active,
      // Check if is_retailer is changing to true and retailer_id is empty
      retailer_id:
        attributeName === "is_retailer" && updatedValue && !user.retailer_id
          ? uuidv4() // Generate a UUID
          : user.retailer_id,
    };

    const res = await fetchData(
      `/users/users/${user.user_id}`,
      "PATCH",
      dataToUpdateForUser,
      userCtx.accessToken
    );
    if (res.ok) {
      // Update the user data in the state
      getUsers();
    } else {
      console.error("Error updating attributes:", res.data);
    }
  };

  const handleRetailerIDChange = async (user, newRetailerID) => {
    // Create the data to be sent for the PATCH request.
    const dataToUpdateForUser = {
      email: user.email,
      is_retailer: user.is_retailer,
      is_admin: user.is_admin,
      is_active: user.is_active,
      retailer_id: newRetailerID, // Updating retailer_id
    };

    // Execute the PATCH request to update the retailer_id.
    const res = await fetchData(
      `/users/users/${user.user_id}`, // URL to update the specific user by user_id
      "PATCH", // HTTP method
      dataToUpdateForUser, // Data to update
      userCtx.accessToken // Access token for authentication
    );

    // Check if the PATCH request was successful.
    if (res.ok) {
      // Re-fetch the data to update the UI.
      getUsers();
    } else {
      // Log the error to the console if the PATCH request fails.
      console.error("Error updating retailer ID:", res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <TextField
        label="Search by User ID or Email"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>Email</TableCell>
              <TableCell style={{ width: "25%" }}>User ID</TableCell>
              <TableCell style={{ width: "25%" }}>Retailer ID</TableCell>
              <TableCell style={{ width: "10%" }}>Is Retailer</TableCell>
              <TableCell style={{ width: "10%" }}>Is Admin</TableCell>
              <TableCell style={{ width: "10%" }}>Is Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUserData.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell style={{ width: "20%" }}>{user.email}</TableCell>
                <TableCell style={{ width: "25%" }}>{user.user_id}</TableCell>
                <TableCell style={{ width: "25%" }}>
                  <TextField
                    value={user.retailer_id || ""}
                    onChange={(e) =>
                      handleRetailerIDChange(user, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <Checkbox
                    checked={user.is_retailer}
                    onChange={() => handleAttributeChange(user, "is_retailer")}
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <Checkbox
                    checked={user.is_admin}
                    onChange={() => handleAttributeChange(user, "is_admin")}
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <Checkbox
                    checked={user.is_active}
                    onChange={() => handleAttributeChange(user, "is_active")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUserData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserManagement;

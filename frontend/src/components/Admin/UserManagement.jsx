import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Paper,
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
      console.log("Updated userData:", res.data);
    } else {
      console.error("Error fetching user data: ", res.data);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Filter the userData based on the searchText
  const filteredUserData = userData.filter(
    (user) =>
      user.id.toString().includes(searchText) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

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
      `/users/users/${user.id}`,
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Paper>
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
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Is Retailer</TableCell>
                <TableCell>Retailer ID</TableCell>
                <TableCell>Is Admin</TableCell>
                <TableCell>Is Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={user.is_retailer}
                      onChange={() =>
                        handleAttributeChange(user, "is_retailer")
                      }
                    />
                  </TableCell>
                  <TableCell>{user.retailer_id}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={user.is_admin}
                      onChange={() => handleAttributeChange(user, "is_admin")}
                    />
                  </TableCell>
                  <TableCell>
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
      </Paper>
    </Box>
  );
};

export default UserManagement;
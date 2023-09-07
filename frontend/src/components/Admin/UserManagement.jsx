import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const UserManagement = () => {
  const fetchData = useFetch(); // Initialize the useFetch hook
  const userCtx = useContext(UserContext);
  const [userData, setUserData] = useState([]);

  console.log(userCtx);
  useEffect(() => {
    // Fetch user data from your API using useFetch
    fetchData("/api/users", "GET", undefined, userCtx.accessToken)
      .then((response) => {
        if (response.ok) {
          setUserData(response.data);
          console.log(1);
        } else {
          console.error("Error fetching user data: ", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [fetchData]);

  return (
    <Box>
      <Paper>
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
              {userData.map((user) => (
                <TableRow>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.is_retailer ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.retailer_id}</TableCell>
                  <TableCell>{user.id_admin ? "Yes" : "No"}</TableCell>
                  <TableCell>{user.id_active ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserManagement;

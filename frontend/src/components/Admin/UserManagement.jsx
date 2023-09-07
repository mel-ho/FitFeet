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
  Checkbox,
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
    fetchData("/users/users", "GET", undefined, userCtx.accessToken)
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

  // PATCH to update user attributes
  const handleAttributeChange = async (user, attribute) => {
    const updatedValue = !user[attribute]; // Toggle the attribute value
    const dataToUpdate = { [attribute]: updatedValue };
    const res = await fetchData(
      `/users/${user.id}`,
      "PATCH",
      dataToUpdate,
      userCtx.accessToken
    );
    if (res.ok) {
      // Update the user data in the state
      setUserData((prevUserData) => {
        const updatedUserData = prevUserData.map((u) => {
          if (u.id === user.id) {
            return { ...u, [attribute]: updatedValue };
          }
          return u;
        });
        return updatedUserData;
      });
    } else {
      console.error(`Error updating ${attribute}: `, res.data);
    }
  };

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
      </Paper>
    </Box>
  );
};

export default UserManagement;
